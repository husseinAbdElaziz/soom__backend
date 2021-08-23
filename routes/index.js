const router = require('express').Router();

//user APIs route
const user = require('./user/user.routes');

router.use('/user', user);

// product routes
const product = require('./product/product.routes');

router.use('/product', product);

const timezoneDeff = -180 * 60000;
router.get('/time', (req, res) =>
  res.json({ time: new Date(Date.now() - timezoneDeff) })
);

module.exports = router;
