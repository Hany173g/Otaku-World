const {expiredCode} = require('./expiredCode');
const {User} = require('./userModel');
const {session} = require('./session');
const {episode} = require('./episode');
const {server} = require('./servers')





// relation user to expired code 
User.hasOne(expiredCode,{foreignKey:'userId',onDelete:'CASCADE'});
expiredCode.belongsTo(User,{foreignKey:'userId'})


//relation session to episode

session.hasMany(episode,{foreignKey:'sessionId',onDelete:'CASCADE'});
episode.belongsTo(session,{foreignKey: 'sessionId'});


//relation episode to server (video url frame)



episode.hasMany(server,{foreignKey:'episodeId',onDelete:'CASCADE'});
server.belongsTo(episode,{foreignKey: 'episodeId'});








module.exports = { User, expiredCode,episode,server,session };

