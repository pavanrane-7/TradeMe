import {
  Brain,
  Shield,
  BarChart3,
  Wallet,
  Activity,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI Trading Assistant",
    desc: "Get intelligent stock insights, market explanations and beginner-friendly trading guidance powered by AI.",
  },

  {
    icon: <BarChart3 size={32} />,
    title: "Live Market Simulation",
    desc: "Experience realistic stock market movement with dynamically changing prices across the platform.",
  },

  {
    icon: <Wallet size={32} />,
    title: "₹10,00,000 Virtual Balance",
    desc: "Practice investing using virtual INR balance without risking real money or connecting bank accounts.",
  },

  {
    icon: <Shield size={32} />,
    title: "Zero Financial Risk",
    desc: "Learn stock trading safely in a completely simulated environment designed for beginners.",
  },

  {
    icon: <Activity size={32} />,
    title: "Real-Time Price Updates",
    desc: "Stock prices update simultaneously across hero sections, market cards and watchlists in real time.",
  },

  {
    icon: <TrendingUp size={32} />,
    title: "Professional Trading UI",
    desc: "Modern glassmorphism interface inspired by institutional-grade trading terminals and platforms.",
  },
];

export default function Features() {
  return (
    <div className="features-section">

      <h2>
        Platform Features
      </h2>

      <div className="feature-grid">

        {features.map((item, index) => (

          <div
            className="feature-card glass"
            key={index}
          >

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>

        ))}

      </div>

    </div>
  );
}