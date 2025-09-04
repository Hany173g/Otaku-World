const {expiredCode} = require('./expiredCode');
const {User} = require('./userModel');
const {session} = require('./session');
const {episode} = require('./episode');
const {server} = require('./servers')
const {comment} = require('./comment')
const {complaint} = require('./complaints')
const{Algorithm} = require('./algorithm')
const {algorithmHistory}  = require('./algorithmHistory')


// relation user to expired code 
User.hasOne(expiredCode,{foreignKey:'userId',onDelete:'CASCADE'});
expiredCode.belongsTo(User,{foreignKey:'userId'})


//relation session to episode

session.hasMany(episode,{foreignKey:'sessionId',onDelete:'CASCADE'});
episode.belongsTo(session,{foreignKey: 'sessionId'});


//relation episode to server (video url frame)



episode.hasMany(server,{foreignKey:'episodeId',onDelete:'CASCADE'});
server.belongsTo(episode,{foreignKey: 'episodeId'});



// relation comment to user


User.hasMany(comment,{foreignKey:'userId',onDelete:'CASCADE'});
comment.belongsTo(User,{foreignKey:'userId'})



//relation comment to episode


episode.hasMany(comment,{foreignKey:'postId',onDelete:'CASCADE'});
comment.belongsTo(episode,{foreignKey:'postId'})


// relation complaint to episode

episode.hasMany(complaint,{foreignKey:'postId',onDelete:'CASCADE'});
complaint.belongsTo(episode,{foreignKey:'postId'});


//relation complaint to user

User.hasMany(complaint,{foreignKey:'userId',onDelete:'CASCADE'});
complaint.belongsTo(User,{foreignKey:'userId'});



// relation algorithm sort to user

User.hasOne(Algorithm,{foreignKey:'userId',onDelete:'CASCADE'});
Algorithm.belongsTo(User,{foreignKey:'userId'});



// relation user to algorithm history


User.hasMany(algorithmHistory,{foreignKey:'userId',onDelete:'CASCADE'});
algorithmHistory.belongsTo(User,{foreignKey:'userId'});



module.exports = { User, expiredCode,episode,server,session ,comment,complaint,Algorithm,algorithmHistory};
