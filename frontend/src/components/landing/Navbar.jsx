import {
  useNavigate,
} from "react-router-dom";

export default function Navbar() {

  const navigate =
    useNavigate();

  const scrollToSection = (
    id
  ) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="navbar glass">

      <div className="logo">
        TradeMe
      </div>

      <div className="nav-links">

        <span
          onClick={() =>
            scrollToSection(
              "features"
            )
          }
        >
          Features
        </span>

        <span
          onClick={() =>
            scrollToSection(
              "market"
            )
          }
        >
          Market
        </span>

        <span
          onClick={() =>
            scrollToSection(
              "aiassistant"
            )
          }
        >
          AI Assistant
        </span>

        <button
          className="login-btn"
          onClick={() =>
            navigate("/auth")
          }
        >
          Login
        </button>

      </div>

    </div>
  );
}