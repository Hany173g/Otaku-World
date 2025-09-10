
const { episode,User ,session} = require('../models/relations');






exports.getSession = async(req,res) => {
    try{
        const{sessionName} = req.params;
  
        let sessionData = await session.findOne({where:{sessionName},
            include:[{
                model:episode
            }],

        });
        if (!sessionData)
        {
            return res.status(400).json({msg:"هذا الأنمي غير موجود"})
        }
  
        res.status(200).json({sessionData})      
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}




exports.addLike = async(req,res) => {
    try{
        
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message}) 
    }
}