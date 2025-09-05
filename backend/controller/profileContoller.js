
const { episode, server,session,complaint,User, comment } = require('../models/relations');



const bcrypt = require('bcrypt');

const fs = require("fs");
const path = require("path");



// get profile and sent data isUser = ? , isOwnerProfile = ? , datauser = 

exports.getProfile = async(req,res) => {
    try {
        let {id} = req.params;
        let isUser = null;
      
        let isOwnerProfile = false;
         let userData = await User.findOne({
            where:{id},include:{model:comment,attributes:['content', 'createdAt'],include:{model:episode,attributes:['id', 'numberEpisode'],include:{model:session,attributes:['sessionName']}}}})
        if (req.user)
        {
            isUser = true;
            if (userData.id === req.user.id)
            {
                isOwnerProfile = true;
            }
        }
        if (!userData)
        {
            res.status(400).json({msg:"هذا المستخدم غير موجود او تم حدف حسابه"})
        }
        res.status(200).json({isUser,userData,isOwnerProfile})
    }catch (err)
    {
        res.status(400).json({msg:"يبدو ان هناك مشكله حاول مره  اخره",error:err.message})
    }
}







exports.updateUserData = async(req,res) => {
    try{
        const{username,email,password} = req.body;
   
        let fileName = 'default';
         if (req.file) {
            fileName = req.file.filename;
            console.log(fileName)
        }
        
        const {id} = req.params;
        let isOwnerProfile = false;
        let isUser = false;
         let user = await User.findOne({where:{id}});
         
         // فحص البريد الإلكتروني فقط إذا كان مختلف عن البريد الحالي
         if (email && email !== user.email) {
             let checkEmail = await User.findOne({where:{email}});
             if (checkEmail)
             {
                return res.status(400).json({msg:"هذا البريد الإلكتروني مستخدم بالفعل"})
             }
         }
        if (req.user)
        {
            isUser = true;
            if (user.id === req.user.id)
            {
                isOwnerProfile = true;
            }
        }
       
        if (!user)
        {
         return res.status(400).json({msg:"هذا المستخدم غير موجود"})
        };
        if (isOwnerProfile)
        {
        let hashPassword;
                if (!username){
                username = user.username;
                }
                if (!password){
                password = user.password;
                }
                else {
                    hashPassword = bcrypt.hash(password,10);
                }
                if (!email)
                {
                    email = user.email
                }

        let afterUpdate = await user.update({username,email,password:hashPassword,image:fileName});
        
          return res.status(201).json({ isUser, isOwnerProfile ,userData:afterUpdate});
        }
        else {
            
    const filePath = path.join(__dirname, "..", "uploads", fileName);
            fs.unlink(filePath,() => {
                return res.status(401).json({msg :"لأ يمكنك تعديل في مستخدم اخر"})
            })
           

        }
      
    }catch(err)
    {
         res.status(400).json({msg:"يبدو ان هناك مشكله حاول مره  اخره",error:err.message})
    }
}







