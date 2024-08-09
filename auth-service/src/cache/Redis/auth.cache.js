const redis = require('redis')

const client = redis.createClient()


const addCache = async (user) => {
    await client.connect() //redis connection

    await client.set(JSON.stringify(user), 'EX', 432000)

}

const getCache = async (user) => {
    await client.connect() //redis connection

    const data = await client.get(JSON.stringify(user))

    if(!data) return null
    else return data

}

const deleteCache = async (user) => {
    await client.connect() //redis connection

    await client.del(JSON.stringify(user))

}




module.exports = {
    addCache, getCache, deleteCache
}