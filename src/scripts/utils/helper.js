const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken')
const passwordToHash = (password) => {
    // iki kere şifreledik
   return CryptoJS.HmacSHA256(password,CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
}

const generateAccessToken = (user) => {
    // token üretiyoruz
 return JWT.sign({name: user.email, ...user}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1w' });
}
const generateRefreshToken = (user) => {
    // bu istek doğru böyle bir token var bunu yenilemek için kullanıyoruz
    return JWT.sign({name: user.email, ...user}, process.env.REFRESH_TOKEN_SECRET_KEY);
}


module.exports= {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken
}




