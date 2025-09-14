from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LocationPoint(BaseModel):
    latitude: float
    longitude: float
    address: Optional[str] = None

class AlertBase(BaseModel):
    type: str
    priority: str = "medium"
    message: str
    location: Optional[LocationPoint] = None
    metadata: Optional[str] = None

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int
    tourist_id: int
    status: str
    assigned_officer_id: Optional[int] = None
    created_at: datetime
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class AlertUpdate(BaseModel):
    status: Optional[str] = None
    assigned_officer_id: Optional[int] = None