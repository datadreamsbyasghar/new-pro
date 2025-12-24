import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; // ✅ Dark Mode context

export default function Navbar() {
  const { token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">Note Hub</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          {/* Theme toggle always visible */}
          <li className="nav-item me-3">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </li>

          {!token ? (
            <>
              <li className="nav-item">
                <Link className={isActive("/login")} to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive("/signup")} to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className={isActive("/notes")} to="/notes">Notes</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive("/summarize")} to="/summarize">Summarize</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive("/keywords")} to="/keywords">Keywords</Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}