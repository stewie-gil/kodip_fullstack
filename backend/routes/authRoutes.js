const express = require('express');
const router = express.Router();
const authController = require('./controller/authController')
const verifyToken = require('./verify');
const propertyController = require('./controller/propertyController');
const messageController = require('./controller/messageController');


//register a new user
router.post('/register', authController.register);

//login an existing user
router.post('/login', authController.login);

// post property info
router.post('/post', verifyToken, authController.post);

//post a new property
router.post('/properties', propertyController.post)

//Get all properties
router.get('/properties', propertyController.get);

//logout
router.post('/logout', verifyToken , authController.logout);

//get all users from the database
router.post('/getusers', authController.getusers);


//message app
//router.get('/messageapp', messageController.messageapp);

//get chat history/ all messages
router.post('/chathistory', messageController.loadChatHistory);

//send a message to db
router.post('/sendmessage', messageController.sendMessage);

router.post('/postdata', authController.postdata);

//property with pin
router.post('/userswithpin', propertyController.userswithpin);

//gets a users obj for you
router.post('/usersobj', authController.usersobj);

router.post('/usersobjfromId', authController.usersobjFromId)
module.exports = router;