const express = require("express");
const router = express.Router();
const sessions = require('express-session');

const userController = require('../controller/userController')

router.get('/',userController.userlogin)

router.get('/sign',userController.userSignup)

router.post('/sign',userController.insertUser)

router.get('/userHome',userController.userHome)
// router.post('/sign',userController.userSign)

router.post('/login',userController.userVerification)

router.get('/logout',userController.logout);


module.exports=router