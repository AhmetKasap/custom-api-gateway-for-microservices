const { createProxyMiddleware } = require('http-proxy-middleware');

const productProxy = createProxyMiddleware({
    target: 'http://localhost:5001/api/v1',
    changeOrigin: true,
    logger: console,
    on: {
        proxyReq: (proxyReq, req, res) => {
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

module.exports = productProxy