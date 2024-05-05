const express = require('express');
const routerUser = express.Router();
const controller = require('../controller/user')



routerUser.post('/user/signup',controller.signUp);
routerUser.post('/user/login',controller.Login);
routerUser.get('/user/auth',controller.authUser);
routerUser.get('/user/test',(req,res,next) =>{
    res.status(404).send('<h1>Hello World</h1>');
})

module.exports = routerUser;