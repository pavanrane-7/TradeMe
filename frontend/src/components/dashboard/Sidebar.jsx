import {
  Briefcase,
  BarChart3,
  Star,
  Notebook,
  LogOut,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

export default function Sidebar({
  active,
  setActive,
}) {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const handleLogout = () => {

    logout();

    localStorage.removeItem(
      "currentUser"
    );

    navigate(
      "/",
      {
        replace: true,
      }
    );
  };

  const menus = [
    {
      id: "portfolio",
      icon: <Briefcase size={20} />,
      label: "Portfolio",
    },
    {
      id: "market",
      icon: <BarChart3 size={20} />,
      label: "Market",
    },
    {
      id: "watchlist",
      icon: <Star size={20} />,
      label: "Watchlist",
    },
    {
      id: "journal",
      icon: <Notebook size={20} />,
      label: "Journal",
    },
  ];

  return (
    <div className="sidebar">

      <div>

        <div className="sidebar-logo">
          TradeMe
        </div>

        {menus.map((item) => (

          <div
            key={item.id}
            className={
              active === item.id
                ? "sidebar-item active-side"
                : "sidebar-item"
            }
            onClick={() =>
              setActive(item.id)
            }
          >

            {item.icon}

            <span>
              {item.label}
            </span>

          </div>

        ))}

      </div>

      <div className="sidebar-bottom">

        <div
          className="sidebar-item"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>

      </div>

    </div>
  );
}