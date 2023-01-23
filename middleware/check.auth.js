const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //first divided part depends to space & remove previous of 1 array,so remove Bearer from token
        console.log(token);
        const verify = jwt.verify(token, 'this is a dummy text') //this text from user.js file
        console.log(verify);

        if (verify.userType =='Admin') {
            next();//goes to main route(quotes)

        }
        else {
            res.status(401).json({
                message: "Not Admin"
            })

        }

    } catch (e) {
        res.status(401).json({
            message: "Invalid Token"
        })

    }
}