import TickerStrip from "./TickerStrip";
import CandleChart from "./CandleChart";

export default function Hero() {
  return (
    <div className="hero-container">
      <TickerStrip />

      <div className="hero-content">
        <div className="hero-left">
          <h1>
            Master the Markets,
            Zero Risk.
          </h1>

          <p>
            Learn to invest in stocks
            using real-time data and
            INR 1,000,000 in virtual
            cash. No credit card,
            no real money required.
          </p>

          <div className="hero-buttons">
            <button>
              Start Trading
            </button>

            <button className="secondary-btn">
              Explore Market
            </button>
          </div>
        </div>

        <div className="hero-right">
          <CandleChart />
        </div>
      </div>
    </div>
  );
}