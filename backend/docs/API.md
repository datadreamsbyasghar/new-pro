# backend/docs/API.md
- POST /users/signup: {email, password} -> {id, email}
- POST /users/login: {email, password} -> {access_token, token_type}
- GET /notes: Bearer token -> list notes for user
- POST /notes: {title, content, tags?} + Bearer -> created note
- DELETE /notes/{note_id}: Bearer -> deletion count
- POST /ai/summarize: {text} + Bearer -> {summary}
- POST /ai/keywords: {text} + Bearer -> {keywords[]}