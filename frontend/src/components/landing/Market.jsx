import {
  useMarket,
} from "../../context/MarketContext";
export default function Market() {

  const { stocks } = useMarket();

  return (
    <div className="market-section">

      <div className="market-heading">

        <div>
          <h2>Market Overview</h2>

          <p>
            Live simulated Indian stock
            market prices updating
            dynamically in real time.
          </p>
        </div>

      </div>

      <div className="stocks-grid">

        {stocks.map((stock, index) => (

          <div
            className="stock-mini-card glass"
            key={index}
          >

            <div className="stock-top">

              <div>

                <h3>
                  {stock.name}
                </h3>

                <span className="stock-sub">
                  NSE
                </span>

              </div>

              <div
                className={
                  stock.pnl >= 0
                    ? "stock-pnl green"
                    : "stock-pnl red"
                }
              >
                {stock.pnl}%
              </div>

            </div>

            <div className="stock-price">
              ₹{stock.price}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}