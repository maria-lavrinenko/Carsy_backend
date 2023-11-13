const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const offerSchema = new Schema(
  {
    photo: [
      {
        type: String,
        default: "/carsy-logo.png",
      },
    ],
    brand: String,
    model: String,
    price: { type: String, trim: true },
    energy: String,
    year: String,
    carDealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Offer = model("Offer", offerSchema);

module.exports = Offer;
