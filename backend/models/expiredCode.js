const {DataTypes} = require('sequelize');


const sequelize = require('../config/database');




let expiredCode = sequelize.define('expiredcode',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true,
    },
    code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    expiredTime: {
        type:DataTypes.BIGINT,
        allowNull:false
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
    tableName:'expiredcode',
    timestamps:true
})




module.exports = {expiredCode};