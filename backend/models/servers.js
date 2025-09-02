



let {DataTypes} = require('sequelize')

let sequelize = require('../config/database');





const server = sequelize.define('server',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    serverName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    videoUrl: {
        type:DataTypes.STRING,
        allowNull:false
    },
    episodeId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{ 
    tableName: 'servers',
    timestamps: true
})



module.exports  = { server}