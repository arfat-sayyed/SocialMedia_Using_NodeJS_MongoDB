const express = require('express');
const { route } = require('.');
const router = express.Router();

const postsController = require('../controllers/post_controller');
const { create } = require('../models/user');

router.post('/create', postsController.create);

module.exports = router;