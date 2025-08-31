const {expiredCode} = require('./expiredCode');
const {User} = require('./userModel');








User.hasOne(expiredCode,{foreignKey:'userId',onDelete:'CASCADE'});



expiredCode.belongsTo(User,{foreignKey:'userId'})



module.exports = { User, expiredCode };