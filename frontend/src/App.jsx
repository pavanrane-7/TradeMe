import {
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  TradingProvider,
} from "./context/TradingContext";

import {
  MarketProvider,
} from "./context/MarketContext";

export default function App() {

  return (

    <AuthProvider>

      <MarketProvider>

        <TradingProvider>

          <Routes>

            <Route
              path="/"
              element={<LandingPage />}
            />

            <Route
              path="/auth"
              element={<Auth />}
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>

                  <Dashboard />

                </ProtectedRoute>
              }
            />

          </Routes>

        </TradingProvider>

      </MarketProvider>

    </AuthProvider>

  );
}