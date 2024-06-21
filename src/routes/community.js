const express = require('express');
const router = express.Router();
const communityController = require('../controller/community');
const authenticateToken = require('../middleware/auth');
const processImage = require('../middleware/processImage');

// READ - GET //
router.get('/', communityController.getAllCommunity);
router.get('/:communityId', communityController.getCommunityById);
router.get('/likes/all', communityController.getAllLikes);
router.get('/likes/:communityId', communityController.getLikeByCommunityId);
router.get('/comments/all', communityController.getAllComments);
router.get('/comments/:commentId', communityController.getCommentById);
router.get('/comments/:communityId', communityController.getCommentByCommunityId);

// CREATE - POST //
router.post('/', processImage, authenticateToken, communityController.createPostByUser);
router.post('/:communityId/like', authenticateToken, communityController.likePost);
router.post('/:communityId/comments', authenticateToken, communityController.commentOnPost);

// DELETE - DELETE //
router.delete("/:communityId", communityController.deleteCommunity);
router.delete('/:communityId/unlike', authenticateToken, communityController.unlikePost);
router.delete("/comments/:commentId", authenticateToken, communityController.deleteComment);

module.exports = router;
