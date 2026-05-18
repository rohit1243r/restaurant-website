const express = require("express");
const isAdmin = require("../middleware/admin");
const router = express.Router();
const isLoggedIn = require("../middleware/auth");
const Food = require("../models/Food");
const User = require("../models/User");
const Order = require("../models/Order");
const Reservation = require("../models/Reservation");
const Contact = require("../models/Contact");
const upload = require("../middleware/upload");
const foodController = require("../controllers/foodController");


router.get("/menu", foodController.getMenu);

// MENU PAGE
router.get("/menu", isLoggedIn, async (req, res) => {
  const foods = await Food.find();

  res.render("menu", { foods });
});

// ADD FOOD PAGE
router.get("/add-food", isLoggedIn, isAdmin, (req, res) => {
  res.render("addFood");
});

// ADD FOOD
router.post(
  "/add-food",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    const { name, price, description, category } = req.body;

    const newFood = new Food({
      name,

      price,

      image: "/uploads/" + req.file.filename,

      description,

      category,
    });

    await newFood.save();

    req.flash("success", "Food Added Successfully");

    res.redirect("/menu");
  },
);

// DELETE FOOD
router.get("/delete-food/:id", isLoggedIn, isAdmin, async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);

  res.redirect("/menu");
});

// EDIT PAGE
router.get("/edit-food/:id", isLoggedIn, isAdmin, async (req, res) => {
  const food = await Food.findById(req.params.id);

  res.render("editFood", { food });
});

//Category
router.get("/menu/:category", async (req, res) => {
  const category = req.params.category;
  const foods = await Food.find({ category });

  res.render("menu", { foods });
});

//Search
router.get("/search", async (req, res) => {
  const searchText = req.query.query;
  const foods = await Food.find({
    name: {
      $regex: searchText,
      $options: "i",
    },
  });
  res.render("menu", { foods });
});

// UPDATE FOOD
router.post("/edit-food/:id", isLoggedIn, async (req, res) => {
  const { name, price, image, description, category } = req.body;

  await Food.findByIdAndUpdate(req.params.id, {
    name,
    price,
    image,
    description,
    category,
  });

  res.redirect("/menu");
});

router.get("/admin", isLoggedIn, isAdmin, async (req, res) => {
  const totalFoods = await Food.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();

  res.render("admin", {
    totalFoods,
    totalUsers,
    totalOrders,
  });
});

router.get("/admin/orders", isLoggedIn, isAdmin, async (req, res) => {
  const orders = await Order.find().populate("userId").populate("items.foodId");

  res.render("adminOrders", { orders });
});

router.get(
  "/update-order/:id/:status",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    await Order.findByIdAndUpdate(
      req.params.id,

      {
        status: req.params.status,
      },
    );

    res.redirect("/admin/orders");
  },
);

//Reservation router

router.get("/reservation", isLoggedIn, (req, res) => {
  res.render("reservation");
});

router.post("/reservation", isLoggedIn, async (req, res) => {
  const { name, phone, guests, date, time } = req.body;

  const newReservation = new Reservation({
    userId: req.session.user._id,

    name,
    phone,
    guests,
    date,
    time,
  });

  await newReservation.save();

  req.flash("success", "Table Reserved Successfully");

  res.redirect("/menu");
});

router.get("/my-reservations", isLoggedIn, async (req, res) => {
  const reservations = await Reservation.find({
    userId: req.session.user._id,
  });

  res.render("myReservations", { reservations });
});

//Contact Router

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    message,
  });

  await newContact.save();

  req.flash("success", "Message Sent Successfully");

  res.redirect("/contact");
});

//Admin Contact Route

router.get("/admin/messages", isLoggedIn, isAdmin, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.render("adminMessages", { messages });
});

module.exports = router;
