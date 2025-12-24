# backend/tests/test_auth.py
from auth.auth_service import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token,
)

def test_password_hashing():
    pwd = "secret123"
    hashed = hash_password(pwd)
    assert verify_password(pwd, hashed)

def test_jwt_roundtrip():
    token = create_access_token("user@example.com", 1)
    payload = decode_token(token)
    assert payload and payload["sub"] == "user@example.com"