const {DataTypes}= require('sequelize')
const sequelize = require('../config/database')






const complaint = sequelize.define('complaint', {
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    postId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:'complaints',
    timestamps:true
})



module.exports = {complaint};