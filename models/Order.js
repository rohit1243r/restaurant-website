const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food"
            },

            quantity: Number
        }
    ],

    totalPrice: Number,

    status: {
        type: String,
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;