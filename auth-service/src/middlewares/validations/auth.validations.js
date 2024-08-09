const joi = require('joi')
const APIError = require('../../utils/Error')

const registerValidation = async(req,res,next) => {
    try {
        const schema = joi.object({
            name : joi.string().min(3).max(30).required().trim(),
            lastname : joi.string().min(3).max(30).required().trim(),
            email : joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required().trim().min(3).messages({
                    "string.email" : "\"email\" must be a valid email. example : test@gmail.com"
            }),
            password : joi.string().min(3).max(30).required().trim(),
            
        })
    
        const test = await schema.validateAsync(req.body)
        //console.log("test",test)
        next()
        
    } catch (error) {
        //console.log("error",error.details[0].message)
        throw new APIError(error.details[0].message,400)        
    }
    
}

const loginValidation = async(req,res,next) => {
    try {
        const schema = joi.object({
            email : joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required().trim().min(3).messages({
                "string.email" : "\"email\" must be a valid email. example : test@gmail.com"
            }),
            password : joi.string().min(3).max(30).required().trim()
        })
    
        await schema.validateAsync(req.body)
        next()
        
    } catch (error) {
        //console.log("error",error.details[0].message)
        throw new APIError(error.details[0].message,400)   
        
    }
  
}

module.exports = {
    registerValidation,loginValidation
}