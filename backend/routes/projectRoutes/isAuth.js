const jwt = require('jsonwebtoken');



module.exports = (req,res,next) => {
    try{
        let authHeader = req.header.authorization;
        if (!authorization)
        {
            req.user = null;
            next();
        }
        
        let token = authHeader;
        let decode = jwt.verify(token,process.env.JWT_SECERT)
        req.user = decode;
        next();
    }catch(err)
    {
        req.user = null;
        next();
    }
}