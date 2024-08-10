const redis = require('redis')

const client = redis.createClient()
client.connect() //redis connection



const getCache = async (userId) => {

    const foundUserId = await client.sIsMember("userIdList", userId)
    
    if(!foundUserId) return null
    else return foundUserId

}




module.exports = {
    getCache
}