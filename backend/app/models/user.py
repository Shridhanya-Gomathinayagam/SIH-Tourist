from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geometry
from ..core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # tourist, police, tourism
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Tourist(Base):
    __tablename__ = "tourists"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    digital_id = Column(String, unique=True, index=True)
    kyc_status = Column(String, default="pending")  # pending, verified, rejected
    aadhaar_number = Column(String)
    passport_number = Column(String)
    phone_number = Column(String)
    safety_score = Column(Float, default=8.0)
    current_location = Column(Geometry('POINT'))
    blockchain_hash = Column(String)  # Reference to blockchain record
    
    # Relationships
    user = relationship("User", backref="tourist_profile")
    trips = relationship("Trip", back_populates="tourist")
    alerts = relationship("Alert", back_populates="tourist")
    locations = relationship("Location", back_populates="tourist")

class Police(Base):
    __tablename__ = "police"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    police_id = Column(String, unique=True, index=True)
    station = Column(String)
    jurisdiction = Column(String)
    rank = Column(String)
    
    # Relationships
    user = relationship("User", backref="police_profile")

class TourismDept(Base):
    __tablename__ = "tourism_dept"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    employee_id = Column(String, unique=True, index=True)
    department = Column(String)
    region = Column(String)
    designation = Column(String)
    
    # Relationships
    user = relationship("User", backref="tourism_profile")