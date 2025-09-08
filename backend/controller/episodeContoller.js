
const { episode, comment,User ,complaint, server} = require('../models/relations');



// check data send

function checkDataComment(content,userId,postId,res,req)
{
    if (!content || !userId||!postId)
    {
        return res.status(400).json({msg:"البينات ليست كامله"})
    }
    else if (!req.user)
        {
            return res.status(400).json({msg:"يجب عليك تسجيل الدخول اولأ"});
        }
        
}


// add comment to episode and realtion to user and episode
exports.addComment = async(req,res) => {
    try{
        let isUser = null;
        if (req.user)
        {
            isUser = null;
        }
        const{content,userId,postId} = req.body;
        checkDataComment(content,userId,postId,res,req)

        let checkUser = await User.findOne({where:{id:userId}});
          let post = await episode.findOne({where:{id:postId}}); 
        if(!post)
        {
            return res.status(400).json({msg:"هذا الحلقه غير موجوده"})
        }
       else if (!checkUser) 
        {
            return res.status(400).json({msg:"هذا المستخدم غير موجود"});
        }
         
        let newComment = await post.createComment({content,userId});
        res.status(200).json({msg:"تم اضافه الكومنت بنجاح",newComment,checkUser,isUser})
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء حاول مره اخره",error:err.message})
    }
}







exports.getAllEpisode = async(req,res) => {
    try{
        let isUser= null;
        if (req.user)
        {
            isUser = req.user;
        }
        let allEpisodes = await episode.findAll({});
        res.status(200).json({allEpisodes,isUser})
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}


exports.getEpisode = async(req,res) => {
    try{
        const {episodeId} = req.params;
        let isUser = null;
        if (!episodeId)
        {
            isUser = null;
            return res.status(400).json({msg:"البينات ليست كامله"})
        }
        let episodeData =  await episode.findOne({where:{id:episodeId},include:[
            {model:comment, include: [{model: User}],order: [['createdAt', 'DESC']]},
            {model: server}
        ]});
        
        res.status(200).json({episodeData,isUser})
    }catch(err)
    {
          res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}

// add complaints add realtion to user and episode
exports.addComplaints = async(req,res) => {
    try{
        let {postId,content,userId} = req.body;
        let episodeData = await episode.findOne({where:{id:postId}});
        let checkUser = await User.findOne({where:{id:userId}});
        if (!episodeData)
        {
           return res.status(400).json({msg:"هذا الحلقه غير موجوده"})
        }
        else if(!checkUser)
        {
            return res.status(400).json({msg:"هذا المستخدم غير موجود"});
        }
        let newComplaint = await episodeData.createComplaint({content,userId})
        console.log(newComplaint.dataValues)
        res.status(200).json({msg:"تم ارسال المشكله لي فريق الدعم,شكرا لك",newComplaint})
    }catch(err)
    {
       res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}




