const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

//REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register");
});

//REGISTER User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.redirect("/menu");
});

//LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("login");
});

//LOGIN User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "User Not Found");
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.flash("error", "Wrong Password");

    return res.redirect("/login");
  }

  req.session.user = user;

  req.flash("success", "Login Successful");

  res.redirect("/menu");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Logout Error");
    }

    res.redirect("/login");
  });
});

module.exports = router;
