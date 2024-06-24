const express = require('express');
const router = express.Router();
const communityController = require('../controller/community');
const authenticateToken = require('../middleware/auth');
const processImage = require('../middleware/processImage');

// READ - GET //
router.get('/comments', communityController.getAllComments);
router.get('/:commentId', communityController.getCommentById);
router.get('/:communityId/comments', communityController.getCommentByCommunityId);

// CREATE - POST //
router.post('/:communityId/comments', authenticateToken, processImage, communityController.commentOnPost);

// DELETE - DELETE //
router.delete("/:commentId", authenticateToken, communityController.deleteComment);

module.exports = router;
