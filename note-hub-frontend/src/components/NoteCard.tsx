type Note = {
  id: number;
  title: string;
  content: string;
  tags?: string[] | null;
  created_at?: string;
};

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: number) => void;
}) {
  // ✅ truncate long content
  const preview =
    note.content.length > 150
      ? note.content.slice(0, 150) + "..."
      : note.content;

  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold">{note.title}</h5>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>

        {/* ✅ show created date */}
        {note.created_at && (
          <small className="text-muted">
            Created on {new Date(note.created_at).toLocaleDateString()}
          </small>
        )}

        <p className="card-text mt-2">{preview}</p>

        {/* ✅ tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="mt-2">
            {note.tags.map((t, i) => (
              <span
                className="badge bg-info text-dark me-1"
                key={`${t}-${i}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}