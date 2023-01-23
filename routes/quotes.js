const express = require("express");

const { route } = require("express/lib/application");

const router = express.Router();
const Quotes = require("../models/quotes");
const checkAuth = require('../middleware/check.auth');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dlsxq98fr',
    api_key: '118398969683543',
    api_secret: 'tGqXoFtytnKsKifI2_bcNRZsOhQ',
    secure: true
});

//creating the routes

//get all the quotes

router.get("/quotes", checkAuth, async (req, res) => {
    try {
        const quotes = await Quotes.find()
        res.json(quotes)

    } catch (e) {
        res.json(e)

    }

})

//get single quotes
router.get("/quotes/:quotesId", async (req, res) => {

    const quotesId = req.params.quotesId
    try {
        const c = await Quotes.findById(quotesId)
        res.json(c)

    } catch (e) {
        res.json(e)

    }
})




//create quotes
router.post("/quotes", (req, res) => {

    const file = req.files.img;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        // console.log(result);
        req.body.img = result.url;
        const quotes = await Quotes.create(req.body)
        res.json(quotes)
    })

})




//delete quotes

router.delete("/quotes", async (req, res) => {
    //follow spliturl.js method
    // const img = req.query.img;
    const imgurl = req.query.img;
    const array = imgurl.split('/')
    console.log(array);

    const img = array[array.length - 1];
    console.log(img);
    const imgName = img.split('.')[0];
    console.log(imgName);


    try {
        //you can also use _id without quotemarks
        await Quotes.remove({ "_id": req.query.id});
        // await cloudinary.uploader.destroy(imgName, (err, result) => {
        //     console.log(err, result);
        // })
        await cloudinary.uploader.destroy(imgName); //for img delete
        res.status(200).json({
            message: "done",
        })

    } catch (e) {
        res.json(e)
    }

})

//update quotes

router.put("/quotes/:quotesId", async (req, res) => {
    const quotesId = req.params.quotesId
    try {
        const quotes = await Quotes.updateOne({ _id: quotesId }, req.body)
        res.json(quotes);



    } catch (e) {
        res.json(e)

    }
})



module.exports = router;