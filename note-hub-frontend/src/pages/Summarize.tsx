import { useState } from "react";
import api from "../api";

export default function Summarize() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSummarize(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    setError(null);

    try {
      const res = await api.post("/ai/summarize", { text });
      setSummary(res.data.summary || "No summary returned.");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Summarization failed");
    } finally {
      setLoading(false);
    }
  }

  function copySummary() {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard!");
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Summarize Text</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSummarize} className="card shadow-sm p-4 mb-4 border-0">
        <div className="mb-3">
          <label className="form-label fw-semibold">Enter text to summarize</label>
          <textarea
            className="form-control"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Summarizing...
            </>
          ) : (
            "Summarize"
          )}
        </button>
      </form>

      {summary ? (
        <div className="card shadow-sm p-4 border-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Summary</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={copySummary}>
              Copy
            </button>
          </div>
          <p className="card-text">{summary}</p>
        </div>
      ) : (
        !loading && (
          <div className="text-muted text-center mt-3">
            No summary yet. Enter text above to get started.
          </div>
        )
      )}
    </div>
  );
}