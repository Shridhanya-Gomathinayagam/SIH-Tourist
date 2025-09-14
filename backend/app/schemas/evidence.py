from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EvidenceCreate(BaseModel):
    alert_id: int
    file_name: str
    file_type: str
    description: Optional[str] = None

class Evidence(BaseModel):
    id: int
    alert_id: int
    file_name: str
    file_type: str
    file_size: Optional[int] = None
    s3_url: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True