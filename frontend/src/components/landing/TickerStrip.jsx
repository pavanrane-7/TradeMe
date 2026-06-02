import { useMarket } from "../../context/MarketContext";

export default function TickerStrip() {
  const { stocks } = useMarket();

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {[...stocks, ...stocks].map((stock, index) => (
          <div className="ticker-item" key={index}>
            <span>{stock.name}</span>

            <span>
              ₹{stock.price}
            </span>

            <span
              className={
                stock.pnl >= 0
                  ? "green"
                  : "red"
              }
            >
              {stock.pnl}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}