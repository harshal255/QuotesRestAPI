const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const User = require("../models/user");
const { route } = require('./quotes');


//for bcrypt package used for enctype password data in to mongodb
const bcrypt = require('bcrypt');

//for user result we need to install package jwt
const jwt = require('jsonwebtoken')


router.get('/user/signup', async (req, res) => {

    try {
        const user = await User.find()
        res.json(user)

    } catch (e) {
        res.json(e)

    }
})

router.post('/user/signup', (req, res) => {

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            req.body.password = hash;
            const user = await User.create(req.body)
            res.status(200).json(user)
        }
    });
})


//this code with promises
// router.post('/user/login', (req, res) => {
//     User.find({
//         username: req.body.username //value match with username 

//     }).exec().then((user) => {
//         if (user.lengh < 1) {
//             return res.status(401).json({
//                 message: 'User not exist'
//             })
//         } else {
//             bcrypt.compare(req.body.password, user[0].password, (err, result) => {

//                 if (!result) {
//                     return res.status(401).json({
//                         message: "password matching fail"
//                     })
//                 }
//                 if (result) {

//                     //use json web token
//                     const token = jwt.sign({
//                         username: user[0].username,
//                         userType: user[0].userType,
//                         email: user[0].email,
//                         phone: user[0].phone


//                     }, 'this is a dummy text',
//                         {
//                             expiresIn: "24h"                 //expires in 24 hours
//                         });
//                     res.status(200).json({
//                         username: user[0].username,
//                         userType: user[0].email,
//                         phone: user[0].phone,
//                         token: token
//                     })

//                 }
//             })
//         }

//     }).catch((err) => {

//         res.status(500).json({
//             err: err
//         })
//     })


// })

//this code goes with ecma-script async await

//for get token value

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username }).exec();
        if (user.length < 1) {
            return res.status(401).json({ message: 'User not exist' });
        } else {
            const result = await bcrypt.compare(req.body.password, user[0].password);
            if (!result) {
                return res.status(401).json({ message: "password matching fail" });
            }
            const token = jwt.sign({
                username: user[0].username,
                userType: user[0].userType,
                email: user[0].email,
                phone: user[0].phone
            }, 'this is a dummy text', { expiresIn: "24h" });
            res.status(200).json({
                username: user[0].username,
                userType: user[0].email,
                phone: user[0].phone,
                token: token
            });
        }
    } catch (err) {
        res.status(500).json({ err: err });
    }
});














module.exports = router;