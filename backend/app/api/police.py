from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..core.database import get_db
from ..api.deps import get_current_active_user, require_role
from ..models.user import User
from ..schemas.alert import Alert, AlertUpdate
from ..services.alert_service import AlertService
from ..services.tourist_service import TouristService

router = APIRouter(prefix="/police", tags=["police"])

@router.get("/alerts", response_model=List[Alert])
def get_alerts(
    status: Optional[str] = None,
    limit: int = 50,
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Get alerts for police dashboard"""
    alert_service = AlertService(db)
    return alert_service.get_alerts(status=status, limit=limit)

@router.get("/alerts/{alert_id}", response_model=Alert)
def get_alert_details(
    alert_id: int,
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Get specific alert details"""
    alert_service = AlertService(db)
    alert = alert_service.get_alert_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.put("/alerts/{alert_id}")
def update_alert(
    alert_id: int,
    alert_update: AlertUpdate,
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Update alert status"""
    alert_service = AlertService(db)
    alert = alert_service.update_alert(alert_id, alert_update)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.get("/tourists")
def get_tourists(
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Get all tourists for monitoring"""
    tourist_service = TouristService(db)
    return tourist_service.get_all_tourists()

@router.get("/dashboard/stats")
def get_police_dashboard_stats(
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Get police dashboard statistics"""
    alert_service = AlertService(db)
    tourist_service = TouristService(db)
    
    alert_stats = alert_service.get_alert_statistics()
    tourist_stats = tourist_service.get_tourist_statistics()
    
    return {
        "active_alerts": alert_stats["active_alerts"],
        "active_tourists": tourist_stats["active_tourists"],
        "resolved_today": alert_stats["resolved_today"],
        "total_incidents": alert_stats["total_alerts"]
    }

@router.post("/alerts/{alert_id}/call")
def initiate_call(
    alert_id: int,
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Initiate call to tourist (mock implementation)"""
    alert_service = AlertService(db)
    alert = alert_service.get_alert_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    # Mock call initiation
    return {
        "message": f"Call initiated to tourist for alert {alert_id}",
        "call_id": f"CALL-{alert_id}-{current_user.id}",
        "status": "connecting"
    }

@router.post("/alerts/{alert_id}/assign")
def assign_officer(
    alert_id: int,
    officer_data: dict,
    current_user: User = Depends(require_role("police")),
    db: Session = Depends(get_db)
):
    """Assign officer to alert"""
    alert_service = AlertService(db)
    
    alert_update = AlertUpdate(
        status="acknowledged",
        assigned_officer_id=current_user.id
    )
    
    alert = alert_service.update_alert(alert_id, alert_update)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    return {
        "message": f"Officer {current_user.name} assigned to alert {alert_id}",
        "alert": alert
    }