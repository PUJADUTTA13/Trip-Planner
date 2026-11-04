
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyTrips from "./pages/MyTrips";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Unable to restore user session:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        <h2 className="text-white text-xl font-semibold mt-5">
          TripMate
        </h2>
        <p className="text-slate-400 mt-2">
          Preparing your travel experience...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Home user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-trips"
        element={
          <ProtectedRoute user={user}>
            <MyTrips user={user} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      <Route
        path="/login"
        element={
          user ? <Navigate to="/" replace /> : <Login onLogin={setUser} />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
