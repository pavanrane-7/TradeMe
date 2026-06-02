const express =
  require("express");

const router =
  express.Router();

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  buyStock,
  sellStock,
  getPortfolio,
} = require(
  "../controllers/tradeController"
);

router.post(
  "/buy",
  protect,
  buyStock
);
router.get(
  "/portfolio",
  protect,
  getPortfolio
);
router.post(
  "/sell",
  protect,
  sellStock
);

module.exports =
  router;