const redis = require('redis')
const APIError = require('../../utils/Error')

const client =  redis.createClient() //* connect default 6379 port.

const clientConnection = async () => {
    try {
        return await client.connect()
        
    } catch (error) {
        throw new APIError('redis connection error', 500)
    }
   
}

module.exports = {client, clientConnection}