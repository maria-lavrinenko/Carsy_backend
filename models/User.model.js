const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // Removes the password from queries made to the DB
      select: false,
    },
    role: {
      enum: ["carDealer", "client"],
      type: String,
    },
    address: {
      city: String,
      zipcode: Number,
    },
    phone: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
