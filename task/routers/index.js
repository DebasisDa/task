var express = require('express');
const user_router = require('./user.router');
var router = express.Router();

router.get('/users', user_router)


module.exports = router;