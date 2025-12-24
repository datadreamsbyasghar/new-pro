import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";       // ✅ import Home
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import Summarize from "./pages/Summarize";
import Keywords from "./pages/Keywords";

function App() {
  return (
    <>
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ Routes below */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summarize"
          element={
            <ProtectedRoute>
              <Summarize />
            </ProtectedRoute>
          }
        />
        <Route
          path="/keywords"
          element={
            <ProtectedRoute>
              <Keywords />
            </ProtectedRoute>
          }
        />

        {/* ✅ Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;