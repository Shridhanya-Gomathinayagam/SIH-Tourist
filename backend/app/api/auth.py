from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..schemas.user import UserCreate, UserLogin, Token, User
from ..services.auth_service import AuthService
from ..api.deps import get_current_active_user

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/signup", response_model=User)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    auth_service = AuthService(db)
    return auth_service.create_user(user_data)

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return access token"""
    auth_service = AuthService(db)
    return auth_service.authenticate_user(login_data)

@router.get("/me", response_model=User)
def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """Get current user information"""
    return current_user

@router.get("/profile")
def get_user_profile(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    """Get user profile with role-specific data"""
    auth_service = AuthService(db)
    return auth_service.get_user_profile(current_user.id, current_user.role)

# Import the dependency here to avoid circular imports
from ..api.deps import get_current_active_user