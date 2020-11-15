const express = require('express');
const router = express.Router();
const passport = require('passport');
const { route } = require('.');
const users_Controllers = require('../controllers/users_controllers');

router.get('/profile',passport.checkAuthentication  , users_Controllers.profile);
router.get('/posts', users_Controllers.posts);
router.get('/sign-up', users_Controllers.signup);
router.get('/sign-in', users_Controllers.signin);

router.post('/create', users_Controllers.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}, 
), users_Controllers.createSession);

router.get('/sign-out', users_Controllers.destroySession);
module.exports = router;