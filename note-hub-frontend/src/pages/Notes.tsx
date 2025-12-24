import { useEffect, useState } from "react";
import api from "../api";
import NoteCard from "../components/NoteCard";

type Note = {
  id: number;
  title: string;
  content: string;
  tags?: string[] | null;
  created_at?: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchNotes() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/notes");
      setNotes(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    const tags =
      tagsInput.trim().length > 0
        ? tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
        : undefined;

    try {
      const res = await api.post("/notes", { title, content, tags });
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
      setTagsInput("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add note");
    }
  }

  async function deleteNote(id: number) {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete note");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">Your Notes</h2>

      {/* Error alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Add note form */}
      <form onSubmit={addNote} className="card mb-4 shadow-sm border-0">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              className="form-control"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Tags (comma separated, optional)
            </label>
            <input
              className="form-control"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="work, ideas, tasks"
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Add note
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={fetchNotes}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Refreshing...
                </>
              ) : (
                "Refresh"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Notes list */}
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="alert alert-info text-center">
          No notes yet. Add your first note above.
        </div>
      ) : (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))
      )}
    </div>
  );
}