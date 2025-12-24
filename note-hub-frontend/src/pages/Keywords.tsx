import { useState } from "react";
import api from "../api";

export default function Keywords() {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleKeywords(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setKeywords([]);
    try {
      const res = await api.post("/ai/keywords", { text });
      setKeywords(res.data.keywords || []);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Keyword extraction failed");
    } finally {
      setLoading(false);
    }
  }

  function copyKeywords() {
    navigator.clipboard.writeText(keywords.join(", "));
    alert("Keywords copied to clipboard!");
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Extract Keywords</h2>

      <form onSubmit={handleKeywords} className="card shadow-sm p-4 mb-4 border-0">
        <div className="mb-3">
          <label className="form-label fw-semibold">Enter text</label>
          <textarea
            className="form-control"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2"></span>
          ) : null}
          {loading ? "Extracting..." : "Extract Keywords"}
        </button>
      </form>

      {keywords.length > 0 ? (
        <div className="card shadow-sm p-4 border-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Keywords</h5>
            <button className="btn btn-outline-primary btn-sm" onClick={copyKeywords}>
              Copy
            </button>
          </div>
          <div>
            {keywords.map((kw, i) => (
              <span key={i} className="badge bg-info text-dark me-2 mb-2">
                {kw}
              </span>
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <div className="text-muted text-center mt-3">
            No keywords extracted yet. Enter text above to get started.
          </div>
        )
      )}
    </div>
  );
}