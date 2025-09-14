from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LocationCreate(BaseModel):
    latitude: float
    longitude: float
    address: Optional[str] = None
    accuracy: Optional[float] = None

class Location(BaseModel):
    id: int
    tourist_id: int
    latitude: float
    longitude: float
    address: Optional[str] = None
    timestamp: datetime
    
    class Config:
        from_attributes = True

class SafetyZoneBase(BaseModel):
    name: str
    zone_type: str
    safety_score: float = 5.0
    description: Optional[str] = None

class SafetyZone(SafetyZoneBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True