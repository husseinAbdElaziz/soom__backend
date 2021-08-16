const router = require('express').Router();

//user APIs route
const user = require('./user/user.routes');

router.use('/user', user);

// product routes
const product = require('./product/product.routes');

router.use('/product', product);

module.exports = router;
