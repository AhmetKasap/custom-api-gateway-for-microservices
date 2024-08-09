const userModel = require('../models/user.model')


const deleteUnverifiedAccount = async() => {
    //const deleted = await userModel.deleteMany({verificationAccount : {verifiedAccount : false}})
    try {
        const deleted = await userModel.deleteMany({"verificationAccount.verifiedAccount" : false})
        if(deleted.deletedCount >0) console.log("Unverified accounts are deleted")        
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteUnverifiedAccount


