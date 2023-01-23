const mongoose = require("mongoose")

const Quotes = mongoose.Schema({
    title: String,
    img: String,
    desc: String

})

module.exports = mongoose.model("quotes", Quotes)