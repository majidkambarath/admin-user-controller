const express = require("express");
const router = express.Router();
//const sessions = require('express-session');

const adminController = require('../controller/adminController')

router.get('/admin',adminController.admin)

router.post('/admin',adminController.adminverification)

router.get('/adminlogin',adminController.adminlogin)

router.get('/adminlogout',adminController.adminlogout)

router.get('/addUser',adminController.addUser)

router.post('/addUser',adminController.addUserinsert)

router.get('/editUser',adminController.editUser)

router.post('/editUser',adminController.updateUser)

router.get('/deleteUser',adminController.deleteUser)

module.exports = router