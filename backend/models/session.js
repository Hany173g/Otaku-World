const {DataTypes} = require('sequelize');


const sequelize = require('../config/database');

//   sequelize.sync({ alter: true });



let session = sequelize.define('session',{
    id:{   
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    sessionName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description: {
        type:DataTypes.STRING(1000),
        allowNull: false,
    },
    countEpisode: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    Trillar: {
        type:DataTypes.STRING
    },
    categories: {
        type:DataTypes.JSON,
        allowNull: false
    },
    Image: {
        type:DataTypes.TEXT,
        allowNull: false
    }

    },{
        tableName:'sessions',
        timestamps:false
    })
   



module.exports = {session};
  
