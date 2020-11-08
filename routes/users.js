const express = require('express');
const router = express.Router();
const users_Controllers = require('../controllers/users_controllers');

router.get('/profile', users_Controllers.profile);
router.get('/posts', users_Controllers.posts);
router.get('/sign-up', users_Controllers.signup);
router.get('/sign-in', users_Controllers.signin);

router.post('/create', users_Controllers.create);

router.post('/create-session', users_Controllers.createSession);





module.exports = router;