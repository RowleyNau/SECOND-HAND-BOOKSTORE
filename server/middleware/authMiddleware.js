const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        
        if (!token){
            return res.status(401).json({message:"Не авторизован"})
        }
        
        const decoded = jwt.verify(token, "BB_104567")
        console.log(decoded, req.clients)
        req.clients = decoded
        next()

    } catch (e) {
        res.status(401).json({message: "Не авторизован!"})
    }
}