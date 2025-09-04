const route = require('express').Router();
const isAuth = require('./projectRoutes/isAuth')
const sessionContoller = require('../controller/sessionContoller')






route.get('/:sessionName',isAuth,sessionContoller.getSession)



module.exports = route;
