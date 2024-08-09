const corsWhiteList = ["http://localhost:5000", "http://localhost:5001"] 

const cors = (req,callback) => {
    let corsOptions 
    if(corsWhiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = {origin : true}
    }
    else {
        corsOptions = {origin : false}
    }
    callback(null, corsOptions)
}

module.exports = cors