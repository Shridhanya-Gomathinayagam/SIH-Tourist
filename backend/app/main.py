from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
from contextlib import asynccontextmanager

from .core.config import settings
from .core.database import engine, Base
from .api import auth, tourist, police, tourism, websocket
from .services.notification_service import notification_service

# Create database tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await notification_service.init_redis()
    yield
    # Shutdown
    pass

app = FastAPI(
    title="Smart Tourist Safety Monitoring System",
    description="Backend API for Smart Tourist Safety Monitoring & Incident Response System",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"}
    )

# Health check
@app.get("/")
async def root():
    return {
        "message": "Smart Tourist Safety Monitoring System API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": settings.ENVIRONMENT}

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(tourist.router, prefix="/api/v1")
app.include_router(police.router, prefix="/api/v1")
app.include_router(tourism.router, prefix="/api/v1")
app.include_router(websocket.router, prefix="/api/v1")

# Mock data seeding endpoint (for development)
@app.post("/api/v1/seed-data")
async def seed_mock_data():
    """Seed database with mock data for testing"""
    from .core.database import SessionLocal
    from .models.user import User, Tourist, Police, TourismDept
    from .models.trip import Trip, EmergencyContact
    from .models.alert import Alert
    from .core.security import get_password_hash
    
    db = SessionLocal()
    
    try:
        # Create test users if they don't exist
        test_users = [
            {
                "email": "tourist@test.com",
                "name": "John Doe",
                "role": "tourist",
                "password": "password123"
            },
            {
                "email": "police@test.com",
                "name": "Officer Smith",
                "role": "police",
                "password": "password123"
            },
            {
                "email": "tourism@test.com",
                "name": "Tourism Admin",
                "role": "tourism",
                "password": "password123"
            }
        ]
        
        for user_data in test_users:
            existing_user = db.query(User).filter(User.email == user_data["email"]).first()
            if not existing_user:
                user = User(
                    email=user_data["email"],
                    name=user_data["name"],
                    role=user_data["role"],
                    hashed_password=get_password_hash(user_data["password"])
                )
                db.add(user)
                db.commit()
                db.refresh(user)
                
                # Create role-specific profiles
                if user_data["role"] == "tourist":
                    tourist = Tourist(
                        user_id=user.id,
                        digital_id="DID-001-2024",
                        kyc_status="verified",
                        safety_score=8.0
                    )
                    db.add(tourist)
                elif user_data["role"] == "police":
                    police = Police(
                        user_id=user.id,
                        police_id="POL-001-2024",
                        station="Central Station",
                        jurisdiction="City Center"
                    )
                    db.add(police)
                elif user_data["role"] == "tourism":
                    tourism = TourismDept(
                        user_id=user.id,
                        employee_id="TOU-001-2024",
                        department="Tourism Board",
                        region="Regional Office"
                    )
                    db.add(tourism)
        
        db.commit()
        return {"message": "Mock data seeded successfully"}
        
    except Exception as e:
        db.rollback()
        return {"error": f"Failed to seed data: {str(e)}"}
    finally:
        db.close()

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if settings.ENVIRONMENT == "development" else False
    )