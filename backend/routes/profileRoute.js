const route = require('express').Router();
const isAuth = require('./projectRoutes/isAuth')
const profileContoller = require('../controller/profileContoller')

const upload = require('../config/imageUpload')



route.get('/:id',isAuth,profileContoller.getProfile)

route.post('/updateuser/:id',isAuth,upload.single('avatar'),profileContoller.updateUserData)






module.exports = route;