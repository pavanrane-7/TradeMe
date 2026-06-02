import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  useMarket,
} from "./MarketContext";

const TradingContext =
  createContext();

export function TradingProvider({
  children,
}) {

  const { stocks } =
    useMarket();

  const storedUser =
    localStorage.getItem(
      "trademe-user"
    );

  let currentUser = null;

  try {

    currentUser =
      storedUser
        ? JSON.parse(
            storedUser
          )
        : null;

  } catch (error) {

    console.log(
      "Invalid user JSON"
    );

    localStorage.removeItem(
      "trademe-user"
    );
  }

  const userKey =
    currentUser?.email ||
    "guest";

  const [balance, setBalance] =
    useState(100000);

  const [portfolio, setPortfolio] =
    useState([]);

  const [watchlist, setWatchlist] =
    useState([]);

  useEffect(() => {

    const savedBalance =
      localStorage.getItem(
        `balance_${userKey}`
      );

    const savedPortfolio =
      localStorage.getItem(
        `portfolio_${userKey}`
      );

    const savedWatchlist =
      localStorage.getItem(
        `watchlist_${userKey}`
      );

    if (savedBalance) {

      try {

        setBalance(
          JSON.parse(
            savedBalance
          )
        );

      } catch {

        setBalance(100000);
      }

    } else {

      setBalance(100000);
    }

    if (savedPortfolio) {

      try {

        setPortfolio(
          JSON.parse(
            savedPortfolio
          )
        );

      } catch {

        setPortfolio([]);
      }

    } else {

      setPortfolio([]);
    }

    if (savedWatchlist) {

      try {

        setWatchlist(
          JSON.parse(
            savedWatchlist
          )
        );

      } catch {

        setWatchlist([]);
      }

    } else {

      setWatchlist([]);
    }

  }, [userKey]);

  useEffect(() => {

    localStorage.setItem(
      `balance_${userKey}`,
      JSON.stringify(balance)
    );

  }, [balance, userKey]);

  useEffect(() => {

    localStorage.setItem(
      `portfolio_${userKey}`,
      JSON.stringify(portfolio)
    );

  }, [portfolio, userKey]);

  useEffect(() => {

    localStorage.setItem(
      `watchlist_${userKey}`,
      JSON.stringify(watchlist)
    );

  }, [watchlist, userKey]);

  const buyStock = (
    stock,
    quantity = 1
  ) => {

    const stockPrice =
      Number(stock.price);

    const totalCost =
      stockPrice * quantity;

    if (balance < totalCost)
      return false;

    setBalance((prev) =>
      prev - totalCost
    );

    setPortfolio((prev) => {

      const exists =
        prev.find(
          (item) =>
            item.name ===
            stock.name
        );

      if (exists) {

        const totalQty =
          exists.quantity +
          quantity;

        return prev.map(
          (item) =>

            item.name ===
            stock.name

              ? {
                  ...item,

                  quantity:
                    totalQty,

                  avgPrice:
                    Number(
                      (
                        (
                          Number(
                            item.avgPrice
                          ) *
                            item.quantity +

                          stockPrice *
                            quantity
                        ) / totalQty
                      ).toFixed(2)
                    ),
                }

              : item
        );
      }

      return [
        ...prev,

        {
          name: stock.name,

          quantity,

          avgPrice:
            Number(
              stockPrice.toFixed(2)
            ),
        },
      ];
    });

    return true;
  };

  const sellStock = (
    stockName
  ) => {

    const liveStock =
      stocks.find(
        (s) =>
          s.name === stockName
      );

    if (!liveStock) return;

    const livePrice =
      Number(
        liveStock.price
      );

    setBalance((prev) =>
      prev + livePrice
    );

    setPortfolio((prev) =>

      prev

        .map((item) =>

          item.name === stockName

            ? {
                ...item,

                quantity:
                  item.quantity - 1,
              }

            : item
        )

        .filter(
          (item) =>
            item.quantity > 0
        )

    );
  };

  const addWatchlist = (
    stock
  ) => {

    const exists =
      watchlist.find(
        (item) =>
          item.name ===
          stock.name
      );

    if (!exists) {

      setWatchlist((prev) => [
        ...prev,
        stock,
      ]);
    }
  };

  const portfolioData =
    useMemo(() => {

      return portfolio

        .map((item) => {

          const liveStock =
            stocks.find(
              (s) =>
                s.name ===
                item.name
            );

          if (!liveStock)
            return null;

          const livePrice =
            Number(
              liveStock.price
            );

          const invested =
            Number(
              item.avgPrice
            ) * item.quantity;

          const currentValue =
            livePrice *
            item.quantity;

          const pnl =
            currentValue -
            invested;

          return {
            ...item,

            livePrice,

            currentValue:
              Number(
                currentValue.toFixed(
                  2
                )
              ),

            pnl:
              Number(
                pnl.toFixed(2)
              ),

            pnlPercent:
              Number(
                (
                  (pnl /
                    invested) *
                  100
                ).toFixed(2)
              ),
          };
        })

        .filter(Boolean);

    }, [portfolio, stocks]);

  const invested =
    portfolioData.reduce(
      (acc, item) =>

        acc +
        Number(item.avgPrice) *
          item.quantity,

      0
    );

  const totalValue =
    portfolioData.reduce(
      (acc, item) =>

        acc +
        Number(
          item.currentValue
        ),

      0
    );

  const totalPnl =
    totalValue - invested;

  return (
    <TradingContext.Provider
      value={{

        balance,

        portfolioData,

        watchlist,

        buyStock,

        sellStock,

        addWatchlist,

        invested,

        totalValue,

        totalPnl,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
}

export const useTrading = () =>
  useContext(
    TradingContext
  );