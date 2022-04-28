const httpStatus = require("http-status");

const validate = (schema)  => (req, res, next) => {
      const { value, error } = schema.validate(req.body);
    if(error){
        // sadece mesajların olduğu bir array geri döner join ile stringe çevrilir
       const errorMessage = error.details?.map(detail => detail.message).join(',')
        res.status(httpStatus.BAD_REQUEST).json({error: errorMessage})
        return;
    }
    // validate'dan çıkan data ile req'in body'i eşleştirilir sonra dışarı dönderir
    Object.assign(req, value);
    return next();
}

module.exports = validate;