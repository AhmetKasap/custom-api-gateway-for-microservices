const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name : {type:String, trim:true, required:true},
    lastname : {type : String, trim : true, required : true},
    email : {type : String, trim : true, required : true, unique : true},
    password : {type : String, trim : true, required : true},
})




const auth = mongoose.model('Auth', authSchema)
module.exports = auth

