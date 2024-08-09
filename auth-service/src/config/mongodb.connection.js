require('dotenv').config()

const mongoose = require('mongoose')

const mongoDbConnection = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(response => console.log("Database Connection Successfull"))
    .catch(err => console.log("Database Connection Error"))
}

module.exports = mongoDbConnection
