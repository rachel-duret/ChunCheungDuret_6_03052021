'use stric'


const express = require('express');
const router = express.Router();
const {Likes} = require('../models');
const likesCtrl = require('../controllers/Likes')
const {validateToken} = require('../middleware/auth')

router.post('/', validateToken, likesCtrl.likes )

module.exports = router;