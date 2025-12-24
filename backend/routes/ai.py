# backend/routes/ai.py
from fastapi import APIRouter, Depends

from services.ai_service import summarize_text, extract_keywords   # local import under Option B
from auth.dependencies import get_current_user                     # local import under Option B

router = APIRouter()

@router.post("/summarize")
def summarize(payload: dict, current_user: dict = Depends(get_current_user)):
    text = payload.get("text", "")
    return {"summary": summarize_text(text)}

@router.post("/keywords")
def keywords(payload: dict, current_user: dict = Depends(get_current_user)):
    text = payload.get("text", "")
    return {"keywords": extract_keywords(text)}