from pydantic import BaseModel, Field
from typing import Optional, List

class UserCreate(BaseModel):
    email: str
    password: str  # store hashed in DB

class UserOut(BaseModel):
    id: int
    email: str

class UserLogin(BaseModel):
    email: str
    password: str

class NoteCreate(BaseModel):
    title: str = Field(..., max_length=200)
    content: str
    tags: Optional[List[str]] = None

class NoteOut(BaseModel):
    id: int
    title: str
    content: str
    tags: Optional[List[str]] = None
    user_id: int