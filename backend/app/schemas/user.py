from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str

class UserCreate(UserBase):
    password: str
    # Role-specific fields
    aadhaar_number: Optional[str] = None
    passport_number: Optional[str] = None
    police_id: Optional[str] = None
    employee_id: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class TouristProfile(BaseModel):
    id: int
    digital_id: str
    kyc_status: str
    safety_score: float
    phone_number: Optional[str] = None
    
    class Config:
        from_attributes = True

class TouristUpdate(BaseModel):
    safety_score: Optional[float] = None
    phone_number: Optional[str] = None

class PoliceProfile(BaseModel):
    id: int
    police_id: str
    station: Optional[str] = None
    jurisdiction: Optional[str] = None
    
    class Config:
        from_attributes = True

class TourismProfile(BaseModel):
    id: int
    employee_id: str
    department: Optional[str] = None
    region: Optional[str] = None
    
    class Config:
        from_attributes = True