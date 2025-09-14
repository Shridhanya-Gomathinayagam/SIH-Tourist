from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base

class Evidence(Base):
    __tablename__ = "evidence"
    
    id = Column(Integer, primary_key=True, index=True)
    alert_id = Column(Integer, ForeignKey("alerts.id"))
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)  # image, video, audio, document
    file_size = Column(BigInteger)
    s3_key = Column(String, nullable=False)
    s3_url = Column(String)
    hash_value = Column(String)  # File hash for integrity
    blockchain_hash = Column(String)  # Blockchain reference
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    alert = relationship("Alert")
    uploader = relationship("User")