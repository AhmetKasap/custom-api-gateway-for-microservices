const express = require('express')
const app = express()

const { createProxyMiddleware } = require('http-proxy-middleware');


const checkToken = require('./checkToken')

const productProxy = createProxyMiddleware({
    target: 'http://localhost:5001/test',
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
          //console.log(proxyReq)
          console.log(req.userId)
          proxyReq.setHeader('user-id', req.userId)
        },
        proxyRes: (proxyRes, req, res) => {
          //console.log(proxyRes)
        },
        error: (err, req, res) => {
            console.log(err)
        },
      },
})

app.use('/api', checkToken, productProxy);


app.listen(5000)

