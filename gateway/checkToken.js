const jwt = require('jsonwebtoken')


const checkToken = async(req,res,next) => {
    const bearerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
    if(! bearerToken) {
        throw new Error('Token not found, please log in.')
    } 
    else {
        const token = req.headers.authorization.split(' ')[1]
        await jwt.verify(token, 'ASqweşliğü123klnmöczxqweğpiişlltjkeyuıo4ekjmn', async (err,decoded) => {
            if(err) {
                throw new Error("Token could not be decoded")
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