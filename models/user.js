const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: String,
    password: String,
    phone: Number,
    email: String,
    userType: String,

})

module.exports = mongoose.model("user", User)
