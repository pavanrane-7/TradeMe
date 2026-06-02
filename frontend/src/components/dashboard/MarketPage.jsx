import { useState } from "react";

import {
  useTrading,
} from "../../context/TradingContext";

import {
  useMarket,
} from "../../context/MarketContext";

export default function MarketPage() {

  const { stocks } =
    useMarket();

  const {
    buyStock,
    addWatchlist,
  } = useTrading();

  const [quantities, setQuantities] =
    useState({});

  const [clickedBuy, setClickedBuy] =
    useState({});

  const [clickedWatch, setClickedWatch] =
    useState({});

  const increaseQty = (name) => {

    setQuantities((prev) => ({
      ...prev,
      [name]:
        (prev[name] || 1) + 1,
    }));
  };

  const decreaseQty = (name) => {

    setQuantities((prev) => ({
      ...prev,
      [name]:
        Math.max(
          1,
          (prev[name] || 1) - 1
        ),
    }));
  };

  const handleBuy = (
    e,
    stock
  ) => {

    e.preventDefault();
    e.stopPropagation();

    const qty =
      quantities[stock.name] || 1;

    buyStock(stock, qty);

    setClickedBuy((prev) => ({
      ...prev,
      [stock.name]: true,
    }));

    setTimeout(() => {

      setClickedBuy((prev) => ({
        ...prev,
        [stock.name]: false,
      }));

    }, 350);
  };

  const handleWatchlist = (
    e,
    stock
  ) => {

    e.preventDefault();
    e.stopPropagation();

    addWatchlist(stock);

    setClickedWatch((prev) => ({
      ...prev,
      [stock.name]: true,
    }));

    setTimeout(() => {

      setClickedWatch((prev) => ({
        ...prev,
        [stock.name]: false,
      }));

    }, 350);
  };

  return (
    <div>

      <h1 className="dash-title">
        Market
      </h1>

      <p className="market-subtitle">
        Explore live simulated Indian
        stock market opportunities.
      </p>

      <div className="market-dashboard-grid">

        {stocks.map((stock,index)=>(

          <div
            key={index}
            className="market-dashboard-card glass"
          >

            <div className="market-card-top">

              <div>

                <h3>
                  {stock.name}
                </h3>

                <p>NSE</p>

              </div>

              <div
                className={`market-pill ${
                  stock.pnl >= 0
                    ? "green"
                    : "red"
                }`}
              >
                {stock.pnl}%
              </div>

            </div>

            <div className="market-price-box">

              <h2>
                ₹{stock.price}
              </h2>

            </div>

            <div className="quantity-box">

              <span>
                Quantity
              </span>

              <div className="qty-controls">

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQty(
                      stock.name
                    );
                  }}
                >
                  -
                </button>

                <strong>
                  {quantities[
                    stock.name
                  ] || 1}
                </strong>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQty(
                      stock.name
                    );
                  }}
                >
                  +
                </button>

              </div>

            </div>

            <div className="market-actions">

              <button
                type="button"
                className={`action-btn ${
                  clickedBuy[
                    stock.name
                  ]
                    ? "buy-success"
                    : ""
                }`}
                onClick={(e) =>
                  handleBuy(
                    e,
                    stock
                  )
                }
              >
                {clickedBuy[
                  stock.name
                ]
                  ? "Bought"
                  : "Buy"}
              </button>

              <button
                type="button"
                className={`action-btn watch-btn ${
                  clickedWatch[
                    stock.name
                  ]
                    ? "watch-success"
                    : ""
                }`}
                onClick={(e) =>
                  handleWatchlist(
                    e,
                    stock
                  )
                }
              >
                {clickedWatch[
                  stock.name
                ]
                  ? "Added"
                  : "Watchlist"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}