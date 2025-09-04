


const { episode,User ,Algorithm,session} = require('../models/relations');

const { Op, fn, col, where, literal } = require('sequelize');







exports.getHome = async(req,res) => {
    try {  
        let isUser = null;
        let id = null;
        if (req.user)
        {
            id = req.user.id
            isUser = req.user;
        } 
        
        let user = await User.findOne({where:{id}})
          let filterCategory=[];
        if (user)
            {

                let sortCategory = await Algorithm.findOne({where:{userId:req.user.id}})
                let categories = sortCategory.get({plain:true});
              
                Object.keys(categories).forEach(key => {
                 
                    if (categories[key] > 0)
                    {
                        filterCategory.push(key);
                    }
                })
            }
           let filterSize = filterCategory.length;
           let bestCategories = filterCategory.slice(2,filterSize-2)
           const bestAnimes = await session.findAll({raw:true});
              let y = 0;   
            const animesData = [];
            for (let i = 0; i < Object.keys(bestAnimes).length;i++)
            {     
                    bestCategories.forEach(Element => {
                        for (let x = 0; x < Object.keys(bestAnimes).length;x++)
                        {
                            if (Element == bestAnimes[i].categories[x])
                                {
                                    y++
                                } 
                        }
                    })
                if (y > 1)
                {
                    animesData.push(bestAnimes[i]);
                  
                }
                if (animesData.length == 10)
                {
                    break;
                }
                y = 0;
            }
        
        res.status(200).json({isUser,animesData})
    }catch(err)
    {
        res.status(400).json({msg:`حدث مشكله ${err.message}`})}
}


