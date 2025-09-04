const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Algorithm = sequelize.define('algorithm', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    adventure: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    comedy: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    drama: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fantasy: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    romance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    shounen: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    shoujo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    horror: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sciFi: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = {Algorithm};
