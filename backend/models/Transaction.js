const mongoose =
  require("mongoose");

const transactionSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      symbol: String,

      type: {
        type: String,
        enum: [
          "BUY",
          "SELL",
        ],
      },

      quantity: Number,

      price: Number,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Transaction",
    transactionSchema
  );