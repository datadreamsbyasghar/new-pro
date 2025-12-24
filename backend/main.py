from fastapi import FastAPI

from routes import notes, users, ai   # local imports under Option B
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Notes Hub")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(notes.router, prefix="/notes", tags=["Notes"])
app.include_router(ai.router, prefix="/ai", tags=["AI"])

@app.get("/")
def root():
    return {"message": "Backend is working!"}