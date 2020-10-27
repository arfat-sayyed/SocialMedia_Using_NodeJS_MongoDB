const express = require('express');
const router = express.Router();
const users_Controllers = require('../controllers/users_controllers');

router.get('/profile', users_Controllers.profile);
router.get('/posts', users_Controllers.posts);





module.exports = router;