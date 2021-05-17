'use stric'

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Users');
const {validateToken} = require('../middleware/auth')

router.post ('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/info', validateToken,userCtrl.info)
router.get('/profile/:id',userCtrl.profile)
module.exports = router;