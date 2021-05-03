'use stric'

const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/Comments');
const { validateToken } = require('../middleware/auth');


router.get('/:postId', commentCtrl.findAllComments);
router.post('/', validateToken, commentCtrl.createComment);




module.exports = router;