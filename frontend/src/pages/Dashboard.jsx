import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";

import Portfolio from "../components/dashboard/Portfolio";

import MarketPage from "../components/dashboard/MarketPage";

import Watchlist from "../components/dashboard/Watchlist";

import Journal from "../components/dashboard/Journal";

import TradingBot from "../components/dashboard/TradingBot";

export default function Dashboard() {

  const [active, setActive] =
    useState("portfolio");

  return (
    <div className="dashboard">

      <Sidebar
        active={active}
        setActive={setActive}
      />

      <div className="dashboard-content">

        {active ===
          "portfolio" && (
          <Portfolio />
        )}

        {active ===
          "market" && (
          <MarketPage />
        )}

        {active ===
          "watchlist" && (
          <Watchlist />
        )}

        {active ===
          "journal" && (
          <Journal />
        )}

      </div>

      <TradingBot />

    </div>
  );
}