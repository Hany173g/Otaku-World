const DataTypes = require('sequelize');



const sequelize = require('../config/database');






let likeAnime = sequelize.define('likeAnime',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    animeId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
{
    tableName:'likeAnimes',
    timestamps:true
})




module.exports = {likeAnime}