const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Offer = model("Offer", offerSchema);

module.exports = Offer;
