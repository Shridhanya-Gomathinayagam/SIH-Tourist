from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class EmergencyContactBase(BaseModel):
    name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    is_primary: bool = False

class EmergencyContactCreate(EmergencyContactBase):
    pass

class EmergencyContact(EmergencyContactBase):
    id: int
    
    class Config:
        from_attributes = True

class TripBase(BaseModel):
    destination: str
    start_date: datetime
    end_date: datetime
    transport_mode: Optional[str] = None
    stay_info: Optional[str] = None
    health_info: Optional[str] = None

class TripCreate(TripBase):
    emergency_contacts: List[EmergencyContactCreate] = []

class Trip(TripBase):
    id: int
    status: str
    created_at: datetime
    emergency_contacts: List[EmergencyContact] = []
    
    class Config:
        from_attributes = True