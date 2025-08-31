const {Sequelize} = require('sequelize');


require('dotenv').config()



const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD,{
    host: process.env.HOST,
    dialect:process.env.DIALECT,
    logging:false
});






sequelize.authenticate()
.then(() => {
    console.log("Connection To database")
}).catch((err) => console.log("Failed Connect Database:", err));


module.exports = sequelize;