const jwt = require('jsonwebtoken')
const APIError = require('../Exceptions/Error')

const checkToken = async(req,res,next) => {
    const bearerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
    if(! bearerToken) {
        throw new APIError('Token not found, please log in.', 401)
    } 
    else {
        const token = req.headers.authorization.split(' ')[1]
        await jwt.verify(token, 'ASqweşliğü123klnmöczxqweğpiişlltjkeyuıo4ekjmn', async (err,decoded) => {
            if(err) {
                throw new APIError("Token could not be decoded", 500)
            }
            else {
                const userId = await decoded.payload.id
                console.log(userId)
                req.userId = userId
                next()
            }
        })
    }
}

module.exports = checkToken