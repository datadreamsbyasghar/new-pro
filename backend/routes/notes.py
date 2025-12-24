# backend/routes/notes.py
from fastapi import APIRouter, Depends, HTTPException

from db.models import NoteCreate, NoteOut        # local import under Option B
from db.db_service import table                  # local import under Option B
from auth.dependencies import get_current_user   # local import under Option B

router = APIRouter()

@router.get("/", response_model=list[NoteOut])
def list_notes(current_user: dict = Depends(get_current_user)):
    res = table("notes").select("*").eq("user_id", current_user["id"]).execute()
    return res.data

@router.post("/", response_model=NoteOut)
def create_note(payload: NoteCreate, current_user: dict = Depends(get_current_user)):
    data = payload.model_dump()
    data["user_id"] = current_user["id"]
    res = table("notes").insert(data).execute()
    note = res.data[0] if res.data else None
    if not note:
        raise HTTPException(status_code=500, detail="Failed to create note")
    return note

@router.delete("/{note_id}")
def delete_note(note_id: int, current_user: dict = Depends(get_current_user)):
    res = table("notes").delete().eq("id", note_id).eq("user_id", current_user["id"]).execute()
    return {"deleted": res.count}