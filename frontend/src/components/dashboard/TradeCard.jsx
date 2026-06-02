export default function TradeCard({
  stock,
  onBuy,
}) {

  return (
    <div className="trade-card glass">

      <div className="trade-card-top">

        <div>

          <h3>
            {stock.name}
          </h3>

          <p>NSE</p>

        </div>

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

      <h2>
        ₹{stock.price}
      </h2>

      <button
        onClick={onBuy}
      >
        Buy
      </button>

    </div>
  );
}