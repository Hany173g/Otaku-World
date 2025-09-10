const DataTypes = require('sequelize');



const sequelize = require('../config/database');







const numberLikesAnime = sequelize.define('numberLikesAnime', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    likesNumber:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
    },
    animeName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps:true
})



module.exports = {numberLikesAnime}