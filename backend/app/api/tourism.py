from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..api.deps import get_current_active_user, require_role
from ..models.user import User
from ..services.tourist_service import TouristService
from ..services.alert_service import AlertService

router = APIRouter(prefix="/tourism", tags=["tourism"])

@router.get("/tourists")
def get_tourist_registry(
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get tourist registry for tourism department"""
    tourist_service = TouristService(db)
    return tourist_service.get_all_tourists()

@router.get("/statistics")
def get_tourism_statistics(
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get tourism statistics and analytics"""
    tourist_service = TouristService(db)
    return tourist_service.get_tourist_statistics()

@router.get("/analytics/influx")
def get_tourist_influx_data(
    period: str = "day",
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get tourist influx trend data"""
    # Mock data for tourist influx
    if period == "day":
        return {
            "period": "day",
            "data": [
                {"time": "12 AM", "value": 45},
                {"time": "2 AM", "value": 32},
                {"time": "4 AM", "value": 28},
                {"time": "6 AM", "value": 65},
                {"time": "8 AM", "value": 89},
                {"time": "10 AM", "value": 120},
                {"time": "12 PM", "value": 145},
                {"time": "2 PM", "value": 132},
                {"time": "4 PM", "value": 156},
                {"time": "6 PM", "value": 134},
                {"time": "8 PM", "value": 98},
                {"time": "10 PM", "value": 76}
            ]
        }
    
    return {"period": period, "data": []}

@router.get("/analytics/destinations")
def get_top_destinations(
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get top tourist destinations with safety scores"""
    return [
        {"rank": 1, "name": "India Gate", "tourists": 456, "safety": 85},
        {"rank": 2, "name": "Red Fort", "tourists": 387, "safety": 82},
        {"rank": 3, "name": "Qutub Minar", "tourists": 298, "safety": 79},
        {"rank": 4, "name": "Lotus Temple", "tourists": 234, "safety": 91},
        {"rank": 5, "name": "Humayuns Tomb", "tourists": 189, "safety": 88}
    ]

@router.get("/analytics/languages")
def get_language_distribution(
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get tourist language distribution"""
    return [
        {"language": "English", "count": 6234, "percentage": 39.3},
        {"language": "Hindi", "count": 3456, "percentage": 21.8},
        {"language": "Tamil", "count": 2134, "percentage": 13.5},
        {"language": "Telugu", "count": 1567, "percentage": 9.9},
        {"language": "Others", "count": 2456, "percentage": 15.5}
    ]

@router.get("/analytics/safety-metrics")
def get_safety_metrics(
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get safety metrics overview"""
    return {
        "low_risk": 968,
        "medium_risk": 234,
        "high_risk": 45,
        "average_score": 78
    }

@router.get("/activities/recent")
def get_recent_activities(
    limit: int = 10,
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Get recent tourism department activities"""
    return [
        {
            "id": 1,
            "type": "digital_id",
            "title": "Digital ID issued to Sarah Johnson",
            "time": "2 minutes ago"
        },
        {
            "id": 2,
            "type": "kyc",
            "title": "KYC verified for Raj Patel",
            "time": "5 minutes ago"
        },
        {
            "id": 3,
            "type": "digital_id",
            "title": "Digital ID issued to Emma Wilson",
            "time": "12 minutes ago"
        },
        {
            "id": 4,
            "type": "kyc",
            "title": "KYC verified for Ali Khan",
            "time": "18 minutes ago"
        }
    ]

@router.put("/tourists/{tourist_id}/kyc")
def update_kyc_status(
    tourist_id: int,
    kyc_data: dict,
    current_user: User = Depends(require_role("tourism")),
    db: Session = Depends(get_db)
):
    """Update tourist KYC status"""
    tourist_service = TouristService(db)
    # Implementation for KYC status update
    return {
        "message": f"KYC status updated for tourist {tourist_id}",
        "status": kyc_data.get("status", "verified")
    }