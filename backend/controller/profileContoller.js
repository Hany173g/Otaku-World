
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
            where:{id},include:{model:comment,attributes:['content', 'createdAt']
                ,include:{model:episode,attributes:['id', 'numberEpisode']
                    ,include:{model:session,attributes:['sessionName']}}}
                    , order: [[{ model: comment }, 'createdAt', 'DESC']]})
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
        let{username,email,password} = req.body;
          const {id} = req.params;
            let fileName;
            let user = await User.findOne({where:{id}});
          fileName = user.image;
       
         if (req.file) {
            fileName = req.file.filename;
        }
        
       
        let isOwnerProfile = false;
        let isUser = false;
         
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
        let hashPassword;
        if (!username){
            username = user.username;
        }
        if (!password){
            password = user.password;
        }
        else {
            hashPassword = await bcrypt.hash(password,10);
        }
        if (!email)
        {
            email = user.email
        }

     
        if (hashPassword) {
            password = hashPassword;
        }
   
        let afterUpdate = await user.update({email,password,username,image:fileName});
        console.log("afterupdate",afterUpdate.dataValues)
        return res.status(201).json({ isUser, isOwnerProfile, userData: afterUpdate});
      
    }catch(err)
    {
         res.status(400).json({msg:"يبدو ان هناك مشكله حاول مره  اخره",error:err.message})
    }
}







