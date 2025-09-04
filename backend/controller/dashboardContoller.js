const { episode, server,session,complaint,User } = require('../models/relations');



function checkDataSession(description,sessionName,countEpisode,Trillar,categories){
    if (!description||!sessionName||!countEpisode||!Trillar||!categories)
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
        const {description,sessionName,countEpisode,Trillar,categories} = req.body;
        let findSession = await session.findOne({where:{sessionName}})
        if (findSession)
        {
            return res.status(400).json({msg:"هذا الأنمي مستخدم من قبل"})
        }
        else if(countEpisode < 0)
        {
            return res.status(400).json({msg:"لأ يمكن ان يكون الحلقات اصغر من صفر"})
        }
        if (checkDataSession(description,sessionName,countEpisode,Trillar,categories))
        {
            return res.status(400).json({msg:"البينات غير كامله"})
        }
        let newServer = await session.create({description,countEpisode,sessionName,Trillar,categories});
        res.status(200).json({msg:"Session is created",newServer})
    }catch(err)
    {
        if (!res.headersSent)
        {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
        }
    }
}


exports.addNewEpisode = async(req,res) => {
    try{
        let {sessionName,numberEpisode,Image,serverName,videoUrl}  = req.body;
  
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
    }catch(err)
    {
         res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}



exports.getAllEpisodesFromSession = async(req,res) => {
    try{
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
    }catch(err)
    {
         res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}






exports.getAllComplaints = async(req,res) => {
    try{
        let complaints = await complaint.findAll({include:[
            {model:episode},
            {model:User}
        ]});
        res.status(200).json({complaints})
    }catch(err)
    {
       res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}