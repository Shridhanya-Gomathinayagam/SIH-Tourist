from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from ..models.alert import Alert
from ..models.user import Tourist
from ..schemas.alert import AlertCreate, AlertUpdate
from geoalchemy2.functions import ST_Point
from typing import List, Optional
import json

class AlertService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_alert(self, tourist_id: int, alert_data: AlertCreate):
        # Create alert
        db_alert = Alert(
            tourist_id=tourist_id,
            type=alert_data.type,
            priority=alert_data.priority,
            message=alert_data.message,
            metadata=alert_data.metadata
        )
        
        # Add location if provided
        if alert_data.location:
            db_alert.location = ST_Point(
                alert_data.location.longitude,
                alert_data.location.latitude
            )
            db_alert.address = alert_data.location.address
        
        self.db.add(db_alert)
        self.db.commit()
        self.db.refresh(db_alert)
        
        return db_alert
    
    def get_alerts(self, status: Optional[str] = None, limit: int = 50):
        query = self.db.query(Alert).join(Tourist).join(Tourist.user)
        
        if status:
            query = query.filter(Alert.status == status)
        
        return query.order_by(desc(Alert.created_at)).limit(limit).all()
    
    def get_alert_by_id(self, alert_id: int):
        return self.db.query(Alert).filter(Alert.id == alert_id).first()
    
    def update_alert(self, alert_id: int, alert_update: AlertUpdate):
        alert = self.db.query(Alert).filter(Alert.id == alert_id).first()
        if not alert:
            return None
        
        if alert_update.status:
            alert.status = alert_update.status
            if alert_update.status == "acknowledged":
                alert.acknowledged_at = func.now()
            elif alert_update.status == "resolved":
                alert.resolved_at = func.now()
        
        if alert_update.assigned_officer_id:
            alert.assigned_officer_id = alert_update.assigned_officer_id
        
        self.db.commit()
        self.db.refresh(alert)
        return alert
    
    def create_panic_alert(self, tourist_id: int, location_data: dict):
        alert_data = AlertCreate(
            type="panic",
            priority="critical",
            message="Emergency panic button activated",
            location=location_data,
            metadata=json.dumps({"source": "panic_button"})
        )
        return self.create_alert(tourist_id, alert_data)
    
    def get_alert_statistics(self):
        total_alerts = self.db.query(Alert).count()
        active_alerts = self.db.query(Alert).filter(Alert.status == "active").count()
        resolved_today = self.db.query(Alert).filter(
            Alert.status == "resolved",
            func.date(Alert.resolved_at) == func.current_date()
        ).count()
        
        return {
            "total_alerts": total_alerts,
            "active_alerts": active_alerts,
            "resolved_today": resolved_today
        }