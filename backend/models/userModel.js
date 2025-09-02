const {DataTypes} = require('sequelize');


const sequelize = require('../config/database');


const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"user"
    }
},{
    tableName:'Users',
    timestamps:true
})



module.exports  = {User};