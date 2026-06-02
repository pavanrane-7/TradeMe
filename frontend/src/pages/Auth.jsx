import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  TrendingUp,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

export default function Auth() {

  const navigate =
    useNavigate();

  const {
    login,
    register,
  } = useAuth();

  const [isRegister, setIsRegister] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {

    e?.preventDefault();

    if (isRegister) {

      const success =
        await register(
          form.name,
          form.email,
          form.password
        );

      if (success) {

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );

      } else {

        alert(
          "Registration failed"
        );
      }

    } else {

      const success =
        await login(
          form.email,
          form.password
        );

      if (success) {

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );

      } else {

        alert(
          "Invalid Credentials"
        );
      }
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-left-content">

          <h1>
            Master Trading
            <br />
            Without Risk.
          </h1>

          <p>
            Practice stock market trading
            using live simulated Indian
            market data with virtual
            portfolio tracking, watchlists,
            AI insights, and journal
            management.
          </p>

          <div className="auth-features">

            <div className="auth-feature">

              <TrendingUp size={20} />

              <span>
                Real-time market simulation
              </span>

            </div>

            <div className="auth-feature">

              <BarChart3 size={20} />

              <span>
                Advanced portfolio tracking
              </span>

            </div>

            <div className="auth-feature">

              <ShieldCheck size={20} />

              <span>
                100% virtual INR trading
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card glass">

          <div className="auth-logo">
            TradeMe
          </div>

          <h2>
            {isRegister
              ? "Create Account"
              : "Welcome Back"}
          </h2>

          <p className="auth-sub">
            {isRegister
              ? "Start your virtual trading journey."
              : "Login to access your trading dashboard."}
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="auth-form"
          >

            {isRegister && (

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
              />

            )}

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />

            <button type="submit">

              {isRegister
                ? "Create Account"
                : "Login"}

            </button>

          </form>

          <div className="auth-switch">

            {isRegister
              ? "Already have an account?"
              : "New to TradeMe?"}

            <span
              onClick={() =>
                setIsRegister(
                  !isRegister
                )
              }
            >

              {isRegister
                ? " Login"
                : " Register"}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}