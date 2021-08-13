/**
 * main APIs module
 * to handle all APIs logic
 */

const router = require('express').Router();

//user APIs route
const user = require('./user/user.routes');

router.use('/user', user);

module.exports = router;
