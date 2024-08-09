const { createProxyMiddleware } = require('http-proxy-middleware');

const authProxy = createProxyMiddleware({
    target: 'http://localhost:5001', 
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const originalPath = req.originalUrl
        const dynamicPart = originalPath.replace('/api-gateway/v1/auth/', '')
        return `/api/v1/auth/${dynamicPart}`
    },
})



module.exports = authProxy