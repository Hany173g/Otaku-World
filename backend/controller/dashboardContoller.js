
const { episode, server,session,complaint,User } = require('../models/relations');





const bcrypt = require('bcrypt')







exports.getDashboard = async(req,res)=>{
    try{
        let isAdmin = false;
        let isUser = false;
        if (req.user.role === 'admin')
        {
            
            isAdmin = true;
        }
        if (req.user)
        {
            isUser = true;
        }
        res.status(200).json({isAdmin,isUser})
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخره",error:err.message})
    }
}




function checkDataSession(description,sessionName,countEpisode,Trillar,categories,Image){
    if (!description||!sessionName||!countEpisode||!Trillar||!categories||!Image)
    {
         return true;
    }
    return false;
}


function checkDataEpisode(sessionName,numberEpisode,Image,videoUrl,serverName,res){
    if (!sessionName||!numberEpisode||!Image||!videoUrl||!serverName)
    {
        return res.status(400).json({msg:"البينات ليست كامله"})
    }
}


exports.addNewSession  = async(req,res) => {
    try{
        if (req.user.role === 'admin')
        {
        const {description,sessionName,countEpisode,Trillar,categories,Image} = req.body;
        let findSession = await session.findOne({where:{sessionName}})
        if (findSession)
        {
            return res.status(400).json({msg:"هذا الأنمي مستخدم من قبل"})
        }
        else if(countEpisode < 0)
        {
            return res.status(400).json({msg:"لأ يمكن ان يكون الحلقات اصغر من صفر"})
        }
        if (checkDataSession(description,sessionName,countEpisode,Trillar,categories,Image))
        {
            return res.status(400).json({msg:"البينات غير كامله"})
        }
        let newServer = await session.create({description,countEpisode,sessionName,Trillar,categories,Image});
        res.status(200).json({msg:"Session is created",newServer})
    }
    else
    {
        res.status(400).json({msg:"انت لست لديك الصلأحيات"})
    }
    }catch(err)
    {
        console.log(err.message)
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
        
    }
}


exports.addNewEpisode = async(req,res) => {
    try{
        
        if (req.user.role === 'admin')
        {
  
        checkDataEpisode(sessionName,numberEpisode,Image,serverName,videoUrl,res)
        let findSession = await session.findOne({where:{sessionName}})

        if (!findSession)
        {
            return res.status(400).json({msg:"لم يتم العثور على نتائج لهذا البحث"})
        }
      
       const sessionWithEpisodes = await session.findOne({
                where: { id: findSession.id },
                include: [   
                      { model: episode }
                ]
                });
    

      
        const episodesData = sessionWithEpisodes.episodes.map(ep => ep.dataValues);
        for (let i = 0; i < episodesData.length;i++)
        {
                if ( numberEpisode === episodesData[i].numberEpisode)
                {
                   return res.status(400).json({msg:"رقم الحلقه هذا مضاف بلفغل"})
                }
        }
    
        let Data =  await findSession.createEpisode({numberEpisode, Image})
        const lastEpisode = Data;
         await lastEpisode.createServer({videoUrl,serverName})
     
        res.status(200).json({msg:"تم اضافه الحلقه بنجاح"})
    }else {
        res.status(400).json({msg:"انت لست لديك الصلأحيات"})
    }
    }catch(err)
    {
         res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}



exports.getAllEpisodesFromSession = async(req,res) => {
    try{
        if (req.user.role === 'admin')
        {
        let {sessionName} = req.body;
        if (!sessionName)
        {
            return res.status(400).json({msg:"البينات ليس كامله"})
        }
        let findSession = await session.findOne({where:{sessionName}})

        if (!findSession)
        {
            return res.status(400).json({msg:"لم يتم العثور على نتائج لهذا البحث"})
        }
        let sessionWithEpisodes = await session.findOne({where:{id:findSession.id},
        include:[
            {model:episode,
                include:[
                    {model:server}
                ]
            }
        ]})
     
        res.status(200).json({data: sessionWithEpisodes})
    }
    else
    {
        res.status(400).json({msg:"انت لست لديك الصلأحيات"})
    }
    }catch(err)
    {
         res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}




exports.getAllSessions = async(req,res) => {
    try{
        if (req.user.role === 'admin')
        {
            let allSessions = await session.findAll({});
            res.status(200).json({allSessions})
        }else {
             res.status(400).json({msg:"انت لست لديك الصلأحيات"})
        }
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
} 



exports.getAllComplaints = async(req,res) => {
    try{
    if(req.user.role === 'admin')
    {
        let complaints = await complaint.findAll({include:[
            {model:episode,attributes:['numberEpisode']},
            {model:User,attributes:['username','id']}
        ]});
        console.log(complaint)
        res.status(200).json({complaints})
    }else {
        res.status(400).json({msg:"انت لست لديك الصلأحيات"})
    }
    }catch(err)
    {
       res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}





// User







exports.getAllUser  = async(req,res)=>
{
    try {
  
        if(req.user.role === 'admin')
        {
        let users = await User.findAll({limit:20})
        res.status(200).json({userData:users})
        }else
        {
            res.status(400).json({msg:"ليس لديك الصلأحيات لغعل هذا"})
        }
    }catch(err)
    {
         res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}


exports.deleteUser = async(req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findOne({where:{id}});
        if (!user)
        {
            return res.status(400).json({msg:"هذا المستخدم غير موجود"})
        }
        await user.destroy();
        res.status(200).json({msg:"تم حذف الحساب بنجاح"})
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}


exports.editUser = async(req,res) => {
    try{
    if (req.user.role === 'admin')
    {
        let {role,username,password,email} = req.body;
   
        
        const checkEmail = await User.findOne({where:{email}});
        if (checkEmail){
            return res.status(400).json({msg:"هذا الجميل مستخدم من قبل"})
        }
        const{id} = req.params;
        const user = await User.findOne({where:{id}});
        if (!user)
        {
            return res.status(400).json({msg:"هذا المستخدم غير موجود"})
        }
        let hashPassword;
         if (!role) {
            role = user.role;
        };
        if (!username){
        username = user.username;
        }
         if (!email)
            {
                email = user.email
            }
        if (!password){
        password = user.password;
        }
        else {
            hashPassword = await bcrypt.hash(password,10);
            password = hashPassword;
        }
        

        await user.update({role,username,password})
        res.status(201).json({msg:"تم تحديث بينات المستخدم بنجاح"});
    }
    else {
     res.status(400).json({msg:"ليس لديك الصلأحيات لغعل هذا"})
    }
    }catch(err){
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}


exports.searchUser = async(req,res) => {
    try {
        if (req.user.role === 'admin')
        {
            let {username} = req.body;
            let users = await User.findAll({where:{username},limit:10});
            if (users.length === 0)
            {
                return res.status(400).json({msg:"لأ يوجد نتائج على هذا البحث"})
            }
            return res.status(200).json({usersData:users})
        } 
    }catch(err)
    {
         res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}