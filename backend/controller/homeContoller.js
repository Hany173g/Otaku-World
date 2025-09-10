


const { episode,User ,Algorithm,session} = require('../models/relations');









exports.searchAnime = async(req,res) => {
    try{
        let isUser = null;
        let {animeName} = req.params;
        if (req.user)
        {
            isUser = req.user;
        }
        let anime = await session.findOne({where:{sessionName:animeName}});
        if (!anime)
        {
            return res.status(400).json({msg:"لأ توجد نتائج لهذا البحث"})
        }
        res.status(200).json({animeData:anime,isUser})

    }catch(err) {
         res.status(400).json({msg:`حدث مشكله ${err.message}`})
    }
}












exports.getHome = async(req,res) => {
    try {  
        let isUser = null;
        if (req.user)
        {
            isUser = req.user;
        } 
        
        let animesData = await session.findAll({raw:true});
        console.log(animesData)
        res.status(200).json({isUser,animesData})
    }catch(err)
    {
        res.status(400).json({msg:`حدث مشكله ${err.message}`})}
}


