const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
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
      required: [true, "Password is required."],
      // This will remove the password from queries made to the DB
      select: false,
    },
    role: {
      enum: ["carDealer", "client"],
      type: String,
    },
    adresse: {
      city: String,
      zipcode: Number,
    },
    phone: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
