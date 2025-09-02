const route = require('express').Router();
const isAuth = require('./projectRoutes/isAuth')
const homeContoller = require('../controller/homeContoller')










route.get('/',isAuth,isAuth,homeContoller.getHome)








module.exports = route;