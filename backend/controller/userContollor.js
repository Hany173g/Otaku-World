const {User} = require('../models/userModel');

const validator = require('validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

require('dotenv').config();

function checkData(username,password,email,res){
    if (!username || !password || !email)
    {
         res.status(400).json({msg:"البينات ليست مكتمله"});
         return true;
    }
    return false;
}
function checkDataLogin(password,email,res){
    if ( !password || !email)
    {
         res.status(400).json({msg:"البينات ليست مكتمله"});
         return true;
    }
    return false;
}


//check length password >= 8 < 16
function validationPassword(password,res) {
    if(password.length < 8 || password.length > 15){
        res.status(400).json({msg:"Password يجب ان  يكون من 8 إلى 15 حرف"});
        return true;
    }
    return false;
}

function validationUsername(username,res) {
    if (username.length < 5 || username.length > 20){
        res.status(400).json({msg:"يجب ان يكون الأسم من 5 حروف الى 20 حرف"});
        return true;
    }
    
    return false;
}

function validationEmail(email,res,findEmail){
      if (!validator.isEmail(email))
        {
            res.status(400).json({msg:"This not a email"})
            return true;
        }
        
    else if(findEmail)
    {
        res.status(400).json({msg:"اسف هذا الأيميل مستخدم من قبل"})
        return true;
    }
        return false;
}



// create new user and full validation and hashing password to database
exports.createNewUser = async(req,res) => {
    try{
        const {username,password,email} = req.body;
        let findEmail = await User.findOne({
            where: {email: email}
        })
        if (checkData(username,password,email,res)) return;
        if (validationUsername(username,res)) return;
        if (validationEmail(email,res,findEmail)) return;
        if (validationPassword(password,res)) return;
                
                // hashing password
        let hashPassword = await bcrypt.hash(password,10);
        
        //saving to database
         await User.create({
            username,
            email,
            password: hashPassword
        })
        res.status(200).json({msg:"تم انشاء الحساب بنجاح"})
    }catch(err)
    {
        res.status(400).json({msg:"يوجد مشكله حاول مره اخره",error:err})
    }
}









exports.login = async(req,res) => {
    try{
        let {email,password} = req.body;
        console.log(req.body)
        if (checkDataLogin(password,email,res)) return;
        if (validationEmail(email,res)) return;
        if (validationPassword(password,res)) return;
        let user = await User.findOne({where:{email:email}});
        if (!user)
        {
            return res.status(400).json({msg:"هذا الحساب غير موجود"})
        }
        let verifyPassword = await bcrypt.compare(password,user.password);
        if (!verifyPassword)
        {
            return res.status(400).json({msg:"الرقم السري غير صحيح"})
        }
        const token = jwt.sign({ id: user.id, username: user.username },process.env.JWT_SECERT,{ expiresIn: '1d' });
        res.status(200).json({msg:"تم تسجيل الدخول بنجاح",token})
    }catch(err)
    {
        res.status(400).json({msg:"حدث مشكله حاول مره اخره",error:err})
    }
}