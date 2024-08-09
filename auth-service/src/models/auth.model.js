const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');


const authSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name : {type:String, trim:true, required:true},
    lastname : {type : String, trim : true, required : true},
    email : {type : String, trim : true, required : true, unique : true},
    password : {type : String, trim : true, required : true},
})




const auth = mongoose.model('Auth', authSchema)
module.exports = auth

