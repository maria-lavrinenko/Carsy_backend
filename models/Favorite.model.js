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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
