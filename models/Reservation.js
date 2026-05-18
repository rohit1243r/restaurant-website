const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    name: String,

    phone: String,

    guests: Number,

    date: String,

    time: String
});


const Reservation = mongoose.model(
    "Reservation",
    reservationSchema
);

module.exports = Reservation