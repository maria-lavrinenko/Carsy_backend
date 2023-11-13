const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const favoriteSchema = new Schema(
  {
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
