const User =
  require("../models/User");

const Portfolio =
  require(
    "../models/Portfolio"
  );

const Transaction =
  require(
    "../models/Transaction"
  );

const buyStock =
  async (req, res) => {

    try {

      const {
        symbol,
        quantity,
        price,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      const totalCost =
        quantity * price;

      if (
        user.balance <
        totalCost
      ) {

        return res
          .status(400)
          .json({
            message:
              "Insufficient balance",
          });
      }

      user.balance -=
        totalCost;

      await user.save();

      let holding =
        await Portfolio.findOne(
          {
            userId:
              user._id,
            symbol,
          }
        );

      if (holding) {

        const totalQty =
          holding.quantity +
          quantity;

        holding.avgPrice =
          (
            holding.avgPrice *
              holding.quantity +
            price *
              quantity
          ) / totalQty;

        holding.quantity =
          totalQty;

        await holding.save();

      } else {

        holding =
          await Portfolio.create(
            {
              userId:
                user._id,
              symbol,
              quantity,
              avgPrice:
                price,
            }
          );
      }

      await Transaction.create(
        {
          userId:
            user._id,
          symbol,
          type: "BUY",
          quantity,
          price,
        }
      );

      res.json({
        message:
          "Stock purchased",
        balance:
          user.balance,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  const getPortfolio =
  async (req, res) => {

    try {

      const portfolio =
        await Portfolio.find({
          userId:
            req.user._id,
        });

      res.json(
        portfolio
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  const sellStock =
  async (req, res) => {

    try {

      const {
        symbol,
        quantity,
        price,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      const holding =
        await Portfolio.findOne(
          {
            userId:
              req.user._id,
            symbol,
          }
        );

      if (!holding) {

        return res
          .status(400)
          .json({
            message:
              "Stock not owned",
          });
      }

      if (
        holding.quantity <
        quantity
      ) {

        return res
          .status(400)
          .json({
            message:
              "Not enough shares",
          });
      }

      holding.quantity -=
        quantity;

      if (
        holding.quantity === 0
      ) {

        await Portfolio.deleteOne(
          {
            _id:
              holding._id,
          }
        );

      } else {

        await holding.save();
      }

      const amount =
        quantity * price;

      user.balance +=
        amount;

      await user.save();

      await Transaction.create(
        {
          userId:
            req.user._id,
          symbol,
          type: "SELL",
          quantity,
          price,
        }
      );

      res.json({
        message:
          "Stock sold",
        balance:
          user.balance,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  buyStock,
  sellStock,
  getPortfolio,
};