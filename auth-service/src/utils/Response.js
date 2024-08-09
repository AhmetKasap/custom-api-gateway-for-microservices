class Response {
    constructor(data = null, message = null) {
        this.data = data,
        this.message = message
    }

    ok(res) {
        return res.status(200).json({
            success : true, 
            data : this.data,
            message : this.message || 'The request succeeded.'
        })
    }

    created(res){
        return res.status(201).json({
            success : true,
            data : this.data,
            message : this.message ?? 'Created resource'
        })
    }

    badRequest(res) {
        return res.status(400).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Bad request',
        })
    }

    unauthorized(res) {
        return res.status(401).json({
            success : false,
            data : this.data,
            message : this.message ?? 'unauthorized transaction'
        })
    }

    forbidden(res) {
        return res.status(403).json({
            success : false,
            data : this.data,
            message : this.message ?? 'forbiden'
        })
    }

    notfound(res) {
        return res.status(404).json({
            success : false,
            data : this.data,
            message : this.message ?? 'Not found'
        })
    }

    tooManyRequest(res) {
        return res.status(429).json({
            success : false,
            data : this.data,
            message : this.message ?? 'too Many Request'
        })
    }

    conflict(res) {
        return res.status(409).json({
            success : false,
            data : this.data,
            message : this.message ?? 'conflict'
        })
    }

    internalServerError(res){
        return res.status(500).json({
            success : false,
            data : this.data,
            message : this.message ?? 'internal server error'
        })
    }


    notImplemented(res) {
        return res.status(501).json({
            success : false,
            data : this.data,
            message : this.message ?? 'not Implemented'
        })
    }

    serviceUnavailable(res){
        return res.status(503).json({
            success : false,
            data : this.data,
            message : this.message ?? 'service Unavailable'
        })
    }

}

module.exports = Response