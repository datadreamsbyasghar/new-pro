# backend/config.py
import os

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://kwftwektvsxhagtkwupp.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZnR3ZWt0dnN4aGFndGt3dXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjIzODE0NiwiZXhwIjoyMDgxODE0MTQ2fQ.HC_C94DQ1aEOG0LrZt7cvvYF5BgpLsNnN5TWPGzUPBg")  # use the secret key here
    JWT_SECRET: str = os.getenv("JWT_SECRET", "8f9a1c2d3e4f5g6h7i8j9k0l1m2n3o4p")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

settings = Settings()