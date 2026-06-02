import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for auth to load from localStorage
  if (loading) {
    return null; // or a loader spinner
  }

  // If not logged in → redirect
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}