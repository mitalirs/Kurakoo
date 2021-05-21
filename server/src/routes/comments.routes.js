const express = require('express');

const {
    requireSignin,
    userMiddleWare
} = require("../common-middleware/middleware");

const commentController = require('../controllers/comments.controller');
const router = express.Router();

router.post('/postComment', requireSignin, userMiddleWare, commentController.postComment);
router.patch('/updateComment/:id', requireSignin, userMiddleWare, commentController.updateComment)
router.delete('/deleteComment/:id', requireSignin, userMiddleWare, commentController.deleteComment)

module.exports = router;
