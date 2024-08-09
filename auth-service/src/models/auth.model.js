const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name : {type:String, trim:true, required:true},
    lastname : {type : String, trim : true, required : true},
    email : {type : String, trim : true, required : true, unique : true},
    password : {type : String, trim : true, required : true},
    verificationAccount : {
        verifiedAccount : {type : Boolean},
        verificationCode : {type : String}
    },
    reset : {
        code : {type : String, default : null},
        time : {type : Date, default : null}
    },
    accountClosure : {
        code : {type : String, default : null},
        time : {type : Date, default : null}
    }
    
})




const auth = mongoose.model('Auth', authSchema)
module.exports = auth

