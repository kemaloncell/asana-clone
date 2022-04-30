const httpStatus = require('http-status');
const JWT = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    //const authHeader = req.headers["authorization"]
   // const token = authHeader && authHeader.split(" ")[1]
    // tek satır hali yoksa null ver
    const token = req.headers?.authorization?.split(" ")[1] || null
    if(token === null) {
        return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için ilk önce giriş yapmak zorundasınız" })
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY,(error, user) =>{
        if(error) return res.status(httpStatus.FORBIDDEN).send({ error: "Token süresi geçmiş..." })
        req.user = user
        next();
    })
}

module.exports = authenticateToken;