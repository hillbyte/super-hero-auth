const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    superHeroName: {
      type: String,
      required: [true, "Please enter a superHeroName"],
      unique: true,
      trim: true,
    },
    realName: {
      type: String,
      required: [true, "Please enter a realName"],
      trim: true,
      maxlength: [20, "Real name must be less than 20 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
