const express = require('express');
const router = express.Router();
const passport = require('passport');
const { route } = require('.');
const users_Controllers = require('../controllers/users_controllers');

router.get('/profile/:id',passport.checkAuthentication  , users_Controllers.profile);
router.post('/update/:id',passport.checkAuthentication  , users_Controllers.update);
router.get('/posts', users_Controllers.posts);
router.get('/sign-up', users_Controllers.signUp);
router.get('/sign-in', users_Controllers.signIn);

router.post('/create', users_Controllers.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}, 
), users_Controllers.createSession);

router.get('/sign-out', users_Controllers.destroySession);
module.exports = router;