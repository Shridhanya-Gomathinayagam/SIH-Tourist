from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models.user import Tourist
from ..models.trip import Trip, EmergencyContact
from ..models.location import Location
from ..schemas.trip import TripCreate
from ..schemas.location import LocationCreate
from geoalchemy2.functions import ST_Point
from typing import List

class TouristService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_tourist_by_user_id(self, user_id: int):
        return self.db.query(Tourist).filter(Tourist.user_id == user_id).first()
    
    def update_safety_score(self, tourist_id: int, safety_score: float):
        tourist = self.db.query(Tourist).filter(Tourist.id == tourist_id).first()
        if tourist:
            tourist.safety_score = safety_score
            self.db.commit()
            self.db.refresh(tourist)
        return tourist
    
    def create_trip(self, tourist_id: int, trip_data: TripCreate):
        # Create trip
        db_trip = Trip(
            tourist_id=tourist_id,
            destination=trip_data.destination,
            start_date=trip_data.start_date,
            end_date=trip_data.end_date,
            transport_mode=trip_data.transport_mode,
            stay_info=trip_data.stay_info,
            health_info=trip_data.health_info
        )
        self.db.add(db_trip)
        self.db.commit()
        self.db.refresh(db_trip)
        
        # Create emergency contacts
        for contact_data in trip_data.emergency_contacts:
            db_contact = EmergencyContact(
                trip_id=db_trip.id,
                name=contact_data.name,
                relationship=contact_data.relationship,
                phone=contact_data.phone,
                email=contact_data.email,
                is_primary=contact_data.is_primary
            )
            self.db.add(db_contact)
        
        self.db.commit()
        return db_trip
    
    def get_active_trip(self, tourist_id: int):
        return self.db.query(Trip).filter(
            Trip.tourist_id == tourist_id,
            Trip.status == "active"
        ).first()
    
    def update_location(self, tourist_id: int, location_data: LocationCreate):
        # Create location record
        db_location = Location(
            tourist_id=tourist_id,
            latitude=location_data.latitude,
            longitude=location_data.longitude,
            location=ST_Point(location_data.longitude, location_data.latitude),
            address=location_data.address,
            accuracy=location_data.accuracy
        )
        self.db.add(db_location)
        
        # Update tourist's current location
        tourist = self.db.query(Tourist).filter(Tourist.id == tourist_id).first()
        if tourist:
            tourist.current_location = ST_Point(location_data.longitude, location_data.latitude)
        
        self.db.commit()
        return db_location
    
    def get_all_tourists(self):
        return self.db.query(Tourist).join(Tourist.user).all()
    
    def get_tourist_statistics(self):
        total_tourists = self.db.query(Tourist).count()
        active_tourists = self.db.query(Tourist).join(Trip).filter(Trip.status == "active").count()
        avg_safety_score = self.db.query(func.avg(Tourist.safety_score)).scalar() or 0
        
        # Popular destinations
        popular_destinations = self.db.query(
            Trip.destination,
            func.count(Trip.id).label('count')
        ).group_by(Trip.destination).order_by(func.count(Trip.id).desc()).limit(5).all()
        
        return {
            "total_tourists": total_tourists,
            "active_tourists": active_tourists,
            "safety_score": round(avg_safety_score, 1),
            "incidents": 5,  # Mock data
            "popular_destinations": [
                {"name": dest, "count": count} for dest, count in popular_destinations
            ]
        }