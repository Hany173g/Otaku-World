const route = require('express').Router();
const dashboardContoller = require('../controller/dashboardContoller');
const isAuth = require('./projectRoutes/isAuth');







route.post('/newAnime',isAuth,dashboardContoller.addNewSession);

route.post('/newEpisode',isAuth,dashboardContoller.addNewEpisode)


route.post('/getAllEpisode',isAuth,dashboardContoller.getAllEpisodesFromSession)




module.exports = route;














