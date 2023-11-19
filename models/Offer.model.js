const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const offerSchema = new Schema(
  {
    photo: [
      {
        type: String,
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

offerSchema.pre("save", function (next) {
  if (!this.photo || !this.photo.length) {
    this.photo = ["/carsy-logo.png"];
  }
  next();
});

const Offer = model("Offer", offerSchema);

module.exports = Offer;
