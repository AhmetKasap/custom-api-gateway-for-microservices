const userModel = require('../models/auth.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const bcrypt = require('bcrypt')
const authMiddlewares = require('../middlewares/auth.middlewares')
const cache = require('../cache/Redis/auth.cache')


const registerController = async(req,res) => {
  
    const auth = await userModel.findOne({email:req.body.email})
    if(auth) throw new APIError('This email is already in use, please try different email', 409)

    const password = await bcrypt.hash(req.body.password,10)
    const userDb = new userModel({
        name : req.body.name,
        lastname : req.body.lastname, 
        email : req.body.email,
        password : password,
        
    })

    const response = await userDb.save()
    if(response) return new Response(null, 'registration created successfully').created(res)
    else throw new APIError('An error occurred during registration', 500)
}


const loginController = async(req,res,next) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again', 400)

    if(await bcrypt.compare(req.body.password, user.password)) {
        await authMiddlewares.createToken(user,res)
        const userForCache = {
            id : user._id,
            email : user.email
        }
            
        await cache.addCache(userForCache)  //added cache
    }
   
}



module.exports = {
    loginController,
    registerController,
}