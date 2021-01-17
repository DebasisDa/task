var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller')

router.get('/users', UserController.getUsers)
router.post('/signup', UserController.setOneUser)
router.post('/login', UserController.login)
router.post('/users/searches', UserController.searches);
router.post('/users/roleCount', UserController.roleCount)

module.exports = router;