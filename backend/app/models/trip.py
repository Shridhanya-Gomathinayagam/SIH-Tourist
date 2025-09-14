from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base

class Trip(Base):
    __tablename__ = "trips"
    
    id = Column(Integer, primary_key=True, index=True)
    tourist_id = Column(Integer, ForeignKey("tourists.id"))
    destination = Column(String, nullable=False)
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    transport_mode = Column(String)
    stay_info = Column(Text)
    health_info = Column(Text)
    status = Column(String, default="active")  # active, completed, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    tourist = relationship("Tourist", back_populates="trips")
    emergency_contacts = relationship("EmergencyContact", back_populates="trip")

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    name = Column(String, nullable=False)
    relationship = Column(String)
    phone = Column(String, nullable=False)
    email = Column(String)
    is_primary = Column(String, default=False)
    
    # Relationships
    trip = relationship("Trip", back_populates="emergency_contacts")