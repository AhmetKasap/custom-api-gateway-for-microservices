const express = require('express')
const app = express()

app.get('/test', async(req,res) => {
  console.log("teee")
  const userId = req.headers['user-id']
  console.log(userId)
})

app.listen(5001)