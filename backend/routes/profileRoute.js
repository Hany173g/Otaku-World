const route = require('express').Router();
const isAuth = require('./projectRoutes/isAuth')
const profileContoller = require('../controller/profileContoller')










route.get('/:id',isAuth,profileContoller.getProfile)








module.exports = route;