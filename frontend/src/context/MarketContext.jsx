import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  initialStocks,
} from "../data/stocks";

const MarketContext =
  createContext();

export function MarketProvider({
  children,
}) {

  const [stocks, setStocks] =
    useState(initialStocks);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setStocks((prev) =>

          prev.map((stock) => {

            const currentPrice =
              Number(stock.price);

            const randomMove =
              (
                Math.random() - 0.5
              ) * 25;

            const updatedPrice =
              Math.max(
                50,
                currentPrice +
                  randomMove
              );

            const updatedPnl =
              (
                ((updatedPrice -
                  currentPrice) /
                  currentPrice) *
                100
              );

            return {
              ...stock,

              price:
                Number(
                  updatedPrice.toFixed(2)
                ),

              pnl:
                Number(
                  updatedPnl.toFixed(2)
                ),
            };
          })

        );

      }, 2500);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <MarketContext.Provider
      value={{
        stocks,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export const useMarket = () =>
  useContext(
    MarketContext
  );