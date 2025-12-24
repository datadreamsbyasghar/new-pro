import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-4 home-hero">
      <h1 className="display-3 fw-bold mb-3 text-light">
        Organize your thoughts. <br /> Summarize your ideas.
      </h1>
      <p className="lead mb-5 text-light" style={{ maxWidth: "700px" }}>
        Welcome to <span className="fw-bold">Note Hub</span> — your personal space for writing,
        summarizing, and extracting keywords from your notes. Built for clarity, speed, and simplicity.
      </p>
      <div>
        <button
          className="btn btn-success btn-lg me-3 px-4 shadow-sm"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-outline-light btn-lg px-4 shadow-sm"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
      <footer className="mt-5 text-light-50 small">
        © {new Date().getFullYear()} Note Hub. All rights reserved.
      </footer>
    </div>
  );
}