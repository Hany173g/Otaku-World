
const { episode,User ,Algorithm,session,algorithmHistory} = require('../models/relations');






exports.getSession = async(req,res) => {
    try{
        const{sessionName} = req.params;
        let user = await User.findOne({where:{id:req.user.id},
            include:[{
                model:algorithmHistory
            }]});
        let sessionData = await session.findOne({where:{sessionName},
            include:[{
                model:episode
            }],

        });
        if (!sessionData)
        {
            return res.status(400).json({msg:"هذا الأنمي غير موجود"})
        }
        let checkSessionFind = false;
        let userAlgorithmHistory = user.get({plain:true})
        for (let i = 0; i < userAlgorithmHistory.algorithmHistories.length;i++)
        {
            
            if (userAlgorithmHistory.algorithmHistories[i].sessionName === sessionName)
            {
                checkSessionFind = true;
                break;
            }
        } 
        if (user && !checkSessionFind)
        {
            let userAlgorithm = await Algorithm.findOne({where:{userId:user.id}}); 
            
             let categoriesAnime = sessionData.categories;   
             
            if (userAlgorithm)
            {                     
                for(let i = 0; i < categoriesAnime.length;i++)
                {
                    let index = categoriesAnime[i];
                    await userAlgorithm.update({[index]: userAlgorithm.dataValues[index]  + 1})
                  
                }
                await algorithmHistory.create({userId:user.id,sessionName})
                } else
                {
                    await user.createAlgorithm();
                    for(let i = 0; i < categoriesAnime.length;i++)
                    {
                        let index = categoriesAnime[i];
                        await userAlgorithm.update({[index]: userAlgorithm.dataValues[index]  + 1})
                        
                    }
                    await algorithmHistory.create({userId:user.id,sessionName})
                }
        }
        
        res.status(200).json({sessionData})      
    }catch(err)
    {
        res.status(400).json({msg:"حدث خطاء ما حاول مره اخر",error:err.message})
    }
}