const {DataTypes} = require('sequelize');


const sequelize = require('../config/database');






const algorithmHistory = sequelize.define('algorithmHistory',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    userId: {
        type:DataTypes.INTEGER,
        allowNull:false,  
    },
    sessionName: {
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'algorithmHistory',
    timestamps:true
})




module.exports =  {algorithmHistory};