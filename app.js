require("dotenv").config();
const cartRoutes = require("./routes/cartRoutes");
const flash = require("connect-flash");
const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const Food = require("./models/Food");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "restaurantSecret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  
  res.locals.success = req.flash("success");
  
  res.locals.error = req.flash("error");
  
  next();
});
app.use(foodRoutes);

app.use(authRoutes);

app.use(cartRoutes);
// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/menu", async (req, res) => {
  const foods = await Food.find();
  res.render("menu", { foods });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

//Db connection

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//server
app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000/");
});
