const express = require('express')
const app = express()
const checkToken = require('./token/checkToken')


const productProxy = require('./services/product')
app.use('/api-gateway/v1/product', checkToken, productProxy)


const authProxy = require('./services/auth')
app.use('/api-gateway/v1/auth/*', authProxy)



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Running on port ${process.env.PORT || 5000}`)
})

