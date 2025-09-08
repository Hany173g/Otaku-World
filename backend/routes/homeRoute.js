const route = require('express').Router();
const isAuth = require('./projectRoutes/isAuth')
const homeContoller = require('../controller/homeContoller')










route.get('/',isAuth,isAuth,homeContoller.getHome)
route.get('/search',isAuth,homeContoller.searchAnime)




route.get('/search/:animeName',isAuth,homeContoller.searchAnime)

module.exports = route;