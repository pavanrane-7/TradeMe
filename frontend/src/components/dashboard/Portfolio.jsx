import {
  useTrading,
} from "../../context/TradingContext";

export default function Portfolio() {

  const {
    balance,
    invested,
    totalValue,
    totalPnl,
    portfolioData,
    sellStock,
  } = useTrading();

  return (
    <div>

      <h1 className="dash-title">
        Portfolio
      </h1>

      <div className="portfolio-grid">

        <div className="portfolio-card glass">

          <span>
            Invested
          </span>

          <h2>
            ₹{invested.toFixed(2)}
          </h2>

        </div>

        <div className="portfolio-card glass">

          <span>
            Current Value
          </span>

          <h2>
            ₹{totalValue.toFixed(2)}
          </h2>

        </div>

        <div className="portfolio-card glass">

          <span>
            Balance
          </span>

          <h2>
            ₹{balance.toFixed(2)}
          </h2>

        </div>

        <div className="portfolio-card glass">

          <span>
            Total P&L
          </span>

          <h2
            className={
              totalPnl >= 0
                ? "green"
                : "red"
            }
          >
            ₹{totalPnl.toFixed(2)}
          </h2>

        </div>

      </div>

      <div className="trade-table glass">

        <div className="trade-head">

          <span>Stock</span>

          <span>Qty</span>

          <span>LTP</span>

          <span>P&L</span>

          <span>Action</span>

        </div>

        {portfolioData.map(
          (stock,index)=>(

            <div
              key={index}
              className="trade-row"
            >

              <span>
                {stock.name}
              </span>

              <span>
                {stock.quantity}
              </span>

              <span>
                ₹{stock.livePrice}
              </span>

              <span
                className={
                  stock.pnl >= 0
                    ? "green"
                    : "red"
                }
              >
                ₹{stock.pnl}
              </span>

              <button
                onClick={() =>
                  sellStock(
                    stock.name
                  )
                }
              >
                Sell
              </button>

            </div>

          )
        )}

      </div>

    </div>
  );
}