
const { User, expiredCode } = require('../models/relations');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const sentEmail = require('../config/sentEmail')
const { Op } = require("sequelize");




cron.schedule('* * * * *', async () => {
    // كل دقيقة
    const now = Date.now();
    await expiredCode.destroy({
        where: {
            expiredTime: {   [Op.lt]: Date.now() }
        }
    });
});




function validationPassword(password,res) {
    if(password.length < 8 || password.length > 15){
        res.status(400).json({msg:"Password لازم يكون من 8 إلى 15 حرف"});
        return true;
    }
    return false;
}


//create random number to use in url Forget Password
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000); // رقم بين 100000 و 999999
}



// create a url and send to email and expired 1h


exports.forgetPassword = async(req,res) => {
    try {
        let {email} = req.body;
        
        if (!email)
        {
            return res.status(400).json({msg:"من فضلك قم بارسال الأيميل الخاص بك"});
        }
         let user = await User.findOne({
            where: {email:email}
        });    
        if (!user)
        {
           return res.status(400).json({msg:"هذا المستخدم غير موجود"})
        }
       
        let code = generateCode();
        let code_id = code.toString() + '_' + user.id.toString();
    
       let expiredTime = Date.now() + 60 * 60 * 1000;
        
       await user.createExpiredcode({ code:code_id, expiredTime  }); 
        sentEmail(user.email,code_id)
        
        res.status(200).json({msg:'تم ارسال رساله على الجميل الخاص بك'})
    }catch(err) {
    return res.status(400).json({ error: err.message || err });
}
}





// Reset Password

exports.resetPassword = async(req,res) => {
    try {
        const linkReset = req.params.id;
        const {newPassword} = req.body;
        let parts = linkReset.split('_'); 
        console.log(parts)
        let id = parts[1];
        if (validationPassword(newPassword,res))return;

        // check expired code
        let checkExpired = await expiredCode.findOne({
            where: {userId:id}
        })
        console.log(checkExpired.expiredTime)
        let date = Date.now();
        if (checkExpired.expiredTime < date)
        {
            res.status(400).json({msg:"تم انتهاء صلأحيه الكود الخاص بك"})
        }

        let user = await User.findOne({
            where:{id:id}
        });
        let hashPassword = await bcrypt.hash(newPassword,10);
        await user.update({password:hashPassword});
        await checkExpired.destroy();
        res.status(201).json({msg:"تم تحديث الرمز الخاص بك"})
    }catch(err)
    {
      
        res.status(400).json({msg:"فشل تحديث الباسورد",error:err.message})
    }
}

// check expired code bigger than 1 hour
exports.checkCode = async(req,res) => {
    try{
        let code = req.params.id;
        
        let findCode = await expiredCode.findOne({
            where:{code}
        })
        if (!findCode)
        {
           return res.status(400).json({msg:"الكود غير صالح"})
        }
        res.status(200).json({msg:"الكود صحيح"})
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء الرجاء المحوله مره اخره",error:err.message})
    }
}