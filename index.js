//Let's create server first
const express = require("express")
const mongoose = require('mongoose')
const quotesrouter = require("./routes/quotes")
const userrouter = require("./routes/user")
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
require("dotenv").config();

const app = express();
const port = process.env.PORT

app.use(bodyParser.json())


mongoose.connect(process.env.DB_CONNECTION_URL, () => {
    console.log("Connected to Database");
})

app.use(fileupload({
    useTempFiles: true //start file uploding
}))



app.use("/", quotesrouter, userrouter, (req, res) => {
    res.send("Hello, I am Your Quotes Home Page")
})

app.listen(process.env.PORT, () => {
    console.log("server Started http://localhost:" + port);
})