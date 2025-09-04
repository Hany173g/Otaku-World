const jwt = require('jsonwebtoken');



module.exports = (req,res,next) => {
    try{
        let authHeader = null;
        if (req.headers['authorization'])
        {
           authHeader = req.headers['authorization'];  
        }
         
        
        if (!authHeader)
        {
            req.user = null;
            
           return next();
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