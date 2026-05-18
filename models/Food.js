const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["Burger", "Pizza", "Pasta","Noodles","Momos","Ice Cream", "Drinks", "Dessert"],
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
