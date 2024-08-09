const express = require('express')
const app = express()

app.get('/api/v1/product', async(req,res) => {
  console.log("teee")
  const userId = req.headers['user-id']
  console.log(userId)
})

app.listen(5002)