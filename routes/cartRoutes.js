const express = require("express");

const Order = require("../models/Order");

const router = express.Router();

const Cart = require("../models/Cart");

const Food = require("../models/Food");

const isLoggedIn = require("../middleware/auth");


// ADD TO CART
router.get("/add-to-cart/:id", isLoggedIn, async (req, res) => {

    const newCart = new Cart({

        userId: req.session.user._id,

        foodId: req.params.id

    });

    await newCart.save();

    req.flash("success", "Item Added To Cart");

    res.redirect("/menu");

});

router.get("/cart", isLoggedIn, async (req, res) => {

    const cartItems = await Cart.find({

        userId: req.session.user._id

    }).populate("foodId");


    let totalPrice = 0;

    cartItems.forEach(item => {

        totalPrice += item.foodId.price * item.quantity;

    });


    res.render("cart", {

        cartItems,
        totalPrice

    });

});


router.get("/remove-cart/:id", isLoggedIn, async (req, res) => {

    await Cart.findByIdAndDelete(req.params.id);

    req.flash("success", "Item Removed From Cart");

    res.redirect("/cart");

});

router.get("/increase/:id", isLoggedIn, async (req, res) => {

    const cartItem = await Cart.findById(req.params.id);

    cartItem.quantity += 1;

    await cartItem.save();

    res.redirect("/cart");

});

router.get("/decrease/:id", isLoggedIn, async (req, res) => {

    const cartItem = await Cart.findById(req.params.id);

    if(cartItem.quantity > 1){

        cartItem.quantity -= 1;

        await cartItem.save();
    }

    res.redirect("/cart");

});

router.get("/place-order", isLoggedIn, async (req, res) => {

    const cartItems = await Cart.find({

        userId: req.session.user._id

    });

    let totalPrice = 0;

    const orderItems = [];

    for(const item of cartItems){

        const food = await Food.findById(item.foodId);

        totalPrice += food.price * item.quantity;

        orderItems.push({

            foodId: item.foodId,

            quantity: item.quantity
        });
    }

    const newOrder = new Order({

        userId: req.session.user._id,

        items: orderItems,

        totalPrice
    });

    await newOrder.save();

    await Cart.deleteMany({

        userId: req.session.user._id

    });

    req.flash("success", "Order Placed Successfully");

    res.redirect("/orders");

});

router.get("/orders", isLoggedIn, async (req, res) => {

    const orders = await Order.find({

        userId: req.session.user._id

    }).populate("items.foodId");

    res.render("orders", { orders });

});

module.exports = router;