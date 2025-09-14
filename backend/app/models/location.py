from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geometry
from ..core.database import Base

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    tourist_id = Column(Integer, ForeignKey("tourists.id"))
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    location = Column(Geometry('POINT'))
    address = Column(String)
    accuracy = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    tourist = relationship("Tourist", back_populates="locations")

class SafetyZone(Base):
    __tablename__ = "safety_zones"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    zone_type = Column(String, nullable=False)  # safe, moderate, risk
    geometry = Column(Geometry('POLYGON'))
    safety_score = Column(Float, default=5.0)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())