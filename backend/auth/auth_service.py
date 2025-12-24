from datetime import datetime, timedelta, UTC
from jose import jwt
import hashlib
from typing import Optional

from config import settings              # local config module inside backend/
from db.db_service import table          # local db service inside backend/db/


def hash_password(password: str, salt: str = "static-salt"):
    # For demo; replace with passlib/bcrypt in production
    return hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()


def verify_password(password: str, hashed: str, salt: str = "static-salt"):
    return hash_password(password, salt) == hashed


def create_access_token(subject: str, expires_minutes: int = settings.ACCESS_TOKEN_EXPIRE_MINUTES):
    # Use timezone-aware UTC datetime
    expire = datetime.now(UTC) + timedelta(minutes=expires_minutes)
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    except Exception:
        return None


def get_user_by_email(email: str):
    res = table("users").select("*").eq("email", email).limit(1).execute()
    return res.data[0] if res.data else None


def create_user(email: str, password: str):
    hashed = hash_password(password)
    res = table("users").insert({"email": email, "password": hashed}).execute()
    return res.data[0] if res.data else None