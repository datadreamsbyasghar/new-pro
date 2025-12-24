# backend/routes/users.py
from fastapi import APIRouter, HTTPException

from db.models import UserCreate, UserLogin, UserOut              # local import under Option B
from auth.auth_service import (                                   # local import under Option B
    create_user,
    get_user_by_email,
    verify_password,
    create_access_token,
)

router = APIRouter()

@router.post("/signup", response_model=UserOut)
def signup(payload: UserCreate):
    existing = get_user_by_email(payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(payload.email, payload.password)
    return {"id": user["id"], "email": user["email"]}

@router.post("/login")
def login(payload: UserLogin):
    user = get_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(subject=user["email"])
    return {"access_token": token, "token_type": "bearer"}