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

// CREATE - POST //
router.post('/', authenticateToken, processImage, communityController.createPostByUser);
router.post('/:communityId/like', authenticateToken, communityController.likePost);

// DELETE - DELETE //
router.delete("/:communityId", communityController.deleteCommunity);
router.delete('/:communityId/unlike', authenticateToken, communityController.unlikePost);

module.exports = router;
