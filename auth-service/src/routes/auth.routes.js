const express = require('express')
const router = express.Router()

const {
    registerController, 
    loginController, 
} = require('../controllers/auth.controller')


const {registerValidation,loginValidation} = require('../middlewares/validations/auth.validations')

router.post('/login', loginValidation, loginController)
router.post('/register', registerValidation, registerController)


module.exports = router