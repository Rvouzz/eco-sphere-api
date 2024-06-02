const express = require('express');
const router = express.Router();
const communityController = require('../controller/community');
const authenticateToken = require('../middleware/auth');

// READ - GET //
router.get('/', communityController.getAllCommunity);
router.get('/:communityId', communityController.getCommunityById);

// CREATE - POST //
router.post('/', authenticateToken, communityController.createPostByUser);
router.post('/:communityId/like', authenticateToken, communityController.likePost);
router.post('/:communityId/comment', authenticateToken, communityController.commentOnPost);

// DELETE - DELETE //
router.delete("/:communityId", communityController.deleteCommunity);
router.delete('/:communityId/unlike',authenticateToken, communityController.unlikePost);
router.delete("/:commentId", authenticateToken, communityController.deleteComment);

module.exports = router;