from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..api.deps import get_current_active_user, require_role
from ..models.user import User, Tourist
from ..schemas.user import TouristUpdate
from ..schemas.trip import TripCreate, Trip
from ..schemas.location import LocationCreate, Location
from ..schemas.alert import AlertCreate, Alert
from ..services.tourist_service import TouristService
from ..services.alert_service import AlertService
from ..services.notification_service import notification_service
from ..services.ai_service import ai_service

router = APIRouter(prefix="/tourist", tags=["tourist"])

@router.get("/profile")
def get_tourist_profile(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get tourist profile"""
    tourist_service = TouristService(db)
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    if not tourist:
        raise HTTPException(status_code=404, detail="Tourist profile not found")
    return tourist

@router.put("/profile")
def update_tourist_profile(
    profile_update: TouristUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update tourist profile"""
    tourist_service = TouristService(db)
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    if not tourist:
        raise HTTPException(status_code=404, detail="Tourist profile not found")
    
    if profile_update.safety_score is not None:
        tourist = tourist_service.update_safety_score(tourist.id, profile_update.safety_score)
        
        # Send notification if safety score is low
        await notification_service.send_safety_score_alert(
            {"id": tourist.id, "name": current_user.name},
            profile_update.safety_score
        )
    
    return tourist

@router.post("/trip", response_model=Trip)
def create_trip(
    trip_data: TripCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new trip"""
    tourist_service = TouristService(db)
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    if not tourist:
        raise HTTPException(status_code=404, detail="Tourist profile not found")
    
    return tourist_service.create_trip(tourist.id, trip_data)

@router.get("/trip/active", response_model=Trip)
def get_active_trip(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get active trip"""
    tourist_service = TouristService(db)
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    if not tourist:
        raise HTTPException(status_code=404, detail="Tourist profile not found")
    
    trip = tourist_service.get_active_trip(tourist.id)
    if not trip:
        raise HTTPException(status_code=404, detail="No active trip found")
    
    return trip

@router.post("/location")
def update_location(
    location_data: LocationCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update tourist location"""
    tourist_service = TouristService(db)
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    if not tourist:
        raise HTTPException(status_code=404, detail="Tourist profile not found")
    
    location = tourist_service.update_location(tourist.id, location_data)
    
    # Calculate AI safety score
    ai_score = ai_service.calculate_ai_safety_score(
        {"id": tourist.id, "name": current_user.name},
        {"latitude": location_data.latitude, "longitude": location_data.longitude}
    )
    
    # Update safety score if significantly different
    if abs(tourist.safety_score - ai_score) > 1.0:
        tourist_service.update_safety_score(tourist.id, ai_score)
    
    return {"message": "Location updated successfully", "ai_safety_score": ai_score}

@router.post("/panic")
async def trigger_panic_button(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Trigger panic button alert"""
    tourist_service = TouristService(db)
    alert_service = AlertService(db)
    
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    if not tourist:
        raise HTTPException(status_code=404, detail="Tourist profile not found")
    
    # Create panic alert
    alert = alert_service.create_panic_alert(
        tourist.id,
        {"latitude": 28.6139, "longitude": 77.209, "address": "India Gate, New Delhi"}  # Mock location
    )
    
    # Send notifications
    await notification_service.send_panic_alert(
        {"id": tourist.id, "name": current_user.name, "digital_id": tourist.digital_id},
        {"id": alert.id, "created_at": alert.created_at.isoformat(), "address": "India Gate, New Delhi"}
    )
    
    return {"message": "Panic alert sent successfully", "alert_id": alert.id}

@router.post("/chatbot")
def chatbot_query(
    message: dict,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Handle chatbot queries"""
    user_message = message.get("message", "")
    
    # Get tourist context
    tourist_service = TouristService(db)
    tourist = tourist_service.get_tourist_by_user_id(current_user.id)
    
    context = {
        "tourist_id": tourist.id if tourist else None,
        "safety_score": tourist.safety_score if tourist else None
    }
    
    response = ai_service.get_chatbot_response(user_message, context)
    
    return {
        "response": response,
        "timestamp": "2024-01-16T10:30:00Z"
    }