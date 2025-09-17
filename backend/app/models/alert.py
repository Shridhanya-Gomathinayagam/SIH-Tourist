from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geometry
from ..core.database import Base

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    tourist_id = Column(Integer, ForeignKey("tourists.id"))
    type = Column(String, nullable=False)  # panic, geofence, safety, health, anomaly
    priority = Column(String, default="medium")  # low, medium, high, critical
    status = Column(String, default="active")  # active, acknowledged, resolved
    message = Column(Text)
    location = Column(Geometry('POINT'))
    address = Column(String)
    alert_metadata = Column(Text)  # JSON string for additional data
    assigned_officer_id = Column(Integer, ForeignKey("police.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    acknowledged_at = Column(DateTime(timezone=True))
    resolved_at = Column(DateTime(timezone=True))
    
    # Relationships
    tourist = relationship("Tourist", back_populates="alerts")
    assigned_officer = relationship("Police")