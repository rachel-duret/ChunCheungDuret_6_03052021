'use stric'

const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
const postCtrl = require('../controllers/Posts')
const { validateToken } = require('../middleware/auth');


router.get('/', postCtrl.getAllPost );
router.get('/byId/:id', postCtrl.findOnePost);
router.post('/',validateToken, postCtrl.createPost);




module.exports = router;