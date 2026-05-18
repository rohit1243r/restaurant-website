const Food = require("../models/Food");

exports.getMenu = async (req , res) => {
    const foods = await Food.find();
    res.render("menu", {foods });
}