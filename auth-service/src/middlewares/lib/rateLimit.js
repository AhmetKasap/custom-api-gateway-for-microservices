const rateLimit = require("express-rate-limit")

//const allowList = ['45.83.34.253','0.0.0.0']

const limiter = rateLimit({
    //skip: (req, res) => allowList.includes(req.ip),

    limit : async(req,res) => {
        if (req.url === '/users/login' || req.url === '/users/register') return 5
        else return 100
    },

    windowMs: 15 * 60 * 1000, //* 15 minutes
    message : "Too many requests, please try again later.",
    
	standardHeaders: true, 
	legacyHeaders: false
})


module.exports = limiter