const deleteUnverifiedAccount = require('./deleteUnverifiedAccount')
const cron = require('node-cron')

const job = () => {
    cron.schedule('*/15 * * * *', async () => {   //for every minute '* * * * *' 
        await deleteUnverifiedAccount()
    })
}

module.exports = job