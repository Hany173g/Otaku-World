const route = require('express').Router();
const isAuth = require('./projectRoutes/isAuth')
const episodeContoller = require('../controller/episodeContoller')








route.post('/addcomment',isAuth,episodeContoller.addComment)



route.get('/:episodeId',isAuth,episodeContoller.getEpisode)


route.post('/addComplaints',isAuth,episodeContoller.addComplaints)

module.exports = route;