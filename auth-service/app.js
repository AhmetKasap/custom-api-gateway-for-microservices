require('express-async-errors');
const express = require('express')
const app = express()
require('dotenv').config()

//! Database Connection
const mongoDbConnection = require('./src/config/mongodb.connection')
mongoDbConnection()

//! Rate Limit
const limit = require('./src/middlewares/lib/rateLimit')
//app.use('/api/v1',limit)

//! Cors Options
const cors = require('cors')
const corsOptions = require('./src/middlewares/lib/cors')
app.use(cors(corsOptions))


//! Body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//! Routes and ErrorHandler
const routes = require('./src/routes/index.routes')
app.use(`/${process.env.NAME}/${process.env.VERSION}`, routes)


app.use((req,res, next) => {
    res.send('not found url')
    next()
})

const errorHandler = require('./src/middlewares/errorHandler')
app.use(errorHandler)


app.listen(process.env.PORT || 5002, () => {
    console.log(`Server is Running on port ${process.env.PORT || 5001}`)
})