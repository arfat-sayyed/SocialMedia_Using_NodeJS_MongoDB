const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');


console.log('Yes Its Running');

router.get('/', homeController.home);



module.exports = router;