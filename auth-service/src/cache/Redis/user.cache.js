const { client, clientConnection } = require('./redis.connection')

const createUserCache = async (user) => {
    //redis connection
    await clientConnection()

    const id = user._id.toString()

    // Cache'de veri var mı kontrol et
    const cachedData = await client.get(id)

    if (cachedData) {
        return JSON.parse(cachedData)
    } else {
        await client.set(id, JSON.stringify(user), 'EX', 432000) //5 days
        return user
    }

}

const getUserCache = async (user) => {
    await clientConnection()

    const id = user._id.toString()

    // Cache'de veri var mı kontrol et
    const cachedData = await client.get(id)

    if (cachedData) return JSON.parse(cachedData)
    else null

}

const deleteUserCache = async (user) => {

    await clientConnection()

    const id = user._id.toString()

    // Cache'de veri var mı kontrol et
    const cachedData = await client.del(id)

    if (cachedData) return JSON.parse(cachedData)
    else null
    
}

const createFavoritesCache = async (data) => {

}

const getFavoritesCache = async (data) => {

}


module.exports = {
    createUserCache, getUserCache, deleteUserCache
}