const route = require('express').Router();
const dashboardContoller = require('../controller/dashboardContoller');
const isAuth = require('./projectRoutes/isAuth');




route.get('/',isAuth,dashboardContoller.getDashboard)


route.post('/newAnime',isAuth,dashboardContoller.addNewSession);

route.post('/newEpisode',isAuth,dashboardContoller.addNewEpisode)


route.post('/getAllEpisode',isAuth,dashboardContoller.getAllEpisodesFromSession)


route.get('/getAllComplaints',isAuth,dashboardContoller.getAllComplaints)

route.get('/getAllSessions',isAuth,dashboardContoller.getAllSessions);

route.get('/getAllUser',isAuth,dashboardContoller.getAllUser);
route.post('/searchUser',isAuth,dashboardContoller.searchUser);
route.post('/deleteuser',isAuth,dashboardContoller.deleteUser);
route.post('/editUser/:id',isAuth,dashboardContoller.editUser);

module.exports = route;














