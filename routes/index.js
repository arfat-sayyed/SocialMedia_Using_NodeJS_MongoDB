const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
const { route } = require('./users');


console.log('Yes Its Running');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));



module.exports = router;