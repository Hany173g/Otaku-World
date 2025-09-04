const {DataTypes}= require('sequelize')
const sequelize = require('../config/database')






const comment = sequelize.define('comment', {
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
    tableName:'Comments',
    timestamps:true
})



module.exports = {comment};