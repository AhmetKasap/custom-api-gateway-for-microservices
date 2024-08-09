const userModel = require('../models/auth.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mail = require('../helpers/sendMail')
const authMiddlewares = require('../middlewares/auth.middlewares')
const moment = require('moment')
const cache = require('../cache/Redis/user.cache')


const registerController = async(req,res) => {
  
    const auth = await userModel.findOne({email:req.body.email})
    if(auth) throw new APIError('This email is already in use, please try different email', 409)

    const verificationCode = crypto.randomBytes(3).toString('hex')
    let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, req.body.email, "Confirm Email", `Please enter this confirmation code to start using 'myAPI'. ${verificationCode}`)
    await mail.sendMail(mailOption)

    const password = await bcrypt.hash(req.body.password,10)
    const userDb = new userModel({
        name : req.body.name,
        lastname : req.body.lastname, 
        email : req.body.email,
        password : password,
        verificationAccount : {
            verificationCode : verificationCode,
            verifiedAccount : false
        }
    })

    const response = await userDb.save()
    if(response) return new Response(null, 'To complete the registration process, please check your email inbox.').created(res)
    else throw new APIError('An error occurred during registration', 500)
}


const resendVerificationEmailController = async(req,res) => {
    const auth = await userModel.findOne({email:req.body.email})
    if(!auth) throw new APIError('User information is incorrect, please try again', 400)

    if(auth.verificationAccount.verifiedAccount === false) {
        const verificationCode = crypto.randomBytes(3).toString('hex') //*created random code
        let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, req.body.email, "Confirm Email", `Please enter this confirmation code to start using 'myAPI'. ${verificationCode}`)
        await mail.sendMail(mailOption)

        const result = await userModel.updateOne({_id : auth._id}, {verificationAccount : {verificationCode : verificationCode, verifiedAccount : false}})
        if(result) return new Response(null, 'Please check your email inbox again.').ok(res)
    }
    else return new Response(null, 'Already registration completed successfully').conflict(res)
 
}


const completeRegistrationController = async(req,res) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again',400)

    if(user.verificationAccount.verifiedAccount === true) return new Response(null, 'Already registration completed successfully').ok(res)

    if(user.verificationAccount.verificationCode === req.body.verificationCode){
        const result = await userModel.updateOne({_id : user._id}, {verificationAccount : {verifiedAccount:true}})

        if(result) {
            await userModel.updateOne({_id : user._id}, {verificationAccount : {verificationCode:null, verifiedAccount:true}})
            return new Response(null,'Registration completed successfully').created(res)
        }
        else throw new APIError('An error occurred during registration.',500)
    }
    
}


const loginController = async(req,res,next) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again', 400)

    if( (user.verificationAccount.verifiedAccount===true) && await bcrypt.compare(req.body.password, user.password)) {
        const token = await authMiddlewares.createToken(user,res)
        //res.setHeader('Authorization', `Bearer ${token}`);
       
        //await cache.createUserCache(user)  //added cache
        //return new Response(user, "login successfull").ok(res)

    }
    //else throw new APIError('User information is incorrect, please try again', 400)
    /*
    else {
        !Send confirmation email again for unverified accounts
        const verificationCode = crypto.randomBytes(3).toString('hex')
        let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, req.body.email, "Confirm Email", `Please enter this confirmation code to start using 'myAPI'. ${verificationCode}`)
        await mail.sendMail(mailOption)

        return new Response(null, 'To complete the registration process, please check your email inbox.').created(res)
    }
    */
}



const tokenControlTestController = async(req,res) => {
    const authUser = req.authUser
    return new Response(authUser, 'user information').ok(res)
}

const test = async(req,res) => {
    console.log(test)
}


module.exports = {
    loginController,
    registerController,
    completeRegistrationController,
    resendVerificationEmailController,
    tokenControlTestController,
    test
}