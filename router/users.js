const express = require('express')

const routerUser = express.Router();

const { register, login, logout,auth} = require('../controller/user.controller');
const { validateRegisterRules, validateRegister, validateLoginRules, validateLogin } = require('../validate');

routerUser.post('/register',validateRegisterRules(),validateRegister, register)
routerUser.post('/login',validateLoginRules(),validateLogin, login)
routerUser.get('/logout',auth, logout)
module.exports = routerUser;
//console.log(err)