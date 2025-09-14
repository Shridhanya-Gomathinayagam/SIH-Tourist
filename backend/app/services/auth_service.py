from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException, status
from ..models.user import User, Tourist, Police, TourismDept
from ..schemas.user import UserCreate, UserLogin
from ..core.security import verify_password, get_password_hash, create_access_token
from datetime import timedelta
import uuid

class AuthService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_user(self, user_data: UserCreate):
        # Check if user exists
        existing_user = self.db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create user
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            name=user_data.name,
            role=user_data.role,
            hashed_password=hashed_password
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        # Create role-specific profile
        if user_data.role == "tourist":
            tourist_profile = Tourist(
                user_id=db_user.id,
                digital_id=f"DID-{str(uuid.uuid4())[:8].upper()}",
                kyc_status="pending",
                aadhaar_number=user_data.aadhaar_number,
                passport_number=user_data.passport_number
            )
            self.db.add(tourist_profile)
        elif user_data.role == "police":
            police_profile = Police(
                user_id=db_user.id,
                police_id=user_data.police_id or f"POL-{str(uuid.uuid4())[:8].upper()}",
                station="Central Station",
                jurisdiction="City Center"
            )
            self.db.add(police_profile)
        elif user_data.role == "tourism":
            tourism_profile = TourismDept(
                user_id=db_user.id,
                employee_id=user_data.employee_id or f"TOU-{str(uuid.uuid4())[:8].upper()}",
                department="Tourism Board",
                region="Regional Office"
            )
            self.db.add(tourism_profile)
        
        self.db.commit()
        return db_user
    
    def authenticate_user(self, login_data: UserLogin):
        user = self.db.query(User).filter(
            User.email == login_data.email,
            User.role == login_data.role
        ).first()
        
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": user.email, "role": user.role, "user_id": user.id},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user
        }
    
    def get_user_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()
    
    def get_user_profile(self, user_id: int, role: str):
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            return None
        
        profile = None
        if role == "tourist":
            profile = self.db.query(Tourist).filter(Tourist.user_id == user_id).first()
        elif role == "police":
            profile = self.db.query(Police).filter(Police.user_id == user_id).first()
        elif role == "tourism":
            profile = self.db.query(TourismDept).filter(TourismDept.user_id == user_id).first()
        
        return {"user": user, "profile": profile}