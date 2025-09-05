const DataTypes = require('sequelize');



const sequelize = require('../config/database');



const episode = sequelize.define('episode', {
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    numberEpisode:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    Image:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    sessionId: {
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
{
    tableName: 'episodes',
    timestamps: true
})



module.exports = {episode}




