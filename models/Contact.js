const mongoose = require("mongoose");

const constactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,

    createdAt : {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model(
    "Contact", constactSchema
)

module.exports = Contact