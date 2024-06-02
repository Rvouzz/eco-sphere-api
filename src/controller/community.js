const communityModel = require('../models/community');

const getAllCommunity = async (req, res) => {
  try {
    const [data] = await communityModel.getAllCommunity();
    res.json({
      message: 'GET all communities success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const getCommunityById = async (req, res) => {
  const { communityId } = req.params;
  try {
    const [data] = await communityModel.getCommunityById(communityId);
    if (data.length === 0) {
      return res.status(404).json({
        message: 'Community not found',
      });
    }
    res.json({
      message: 'GET community success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const createPostByUser = async (req, res) => {
  const { post, post_img, create_at } = req.body;
  const { id_user } = req.user;
  try {
    await communityModel.createPostByUser(id_user, post, post_img, create_at);
    res.status(201).json({
      message: 'Community post was successful',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const deleteCommunity = async (req, res) => {
  const { communityId } = req.params;
  try {
    await communityModel.deleteCommunity(communityId);
    res.status(200).json({
      message: "DELETE post success",
    });
  } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
  }
};

// LIKE - UNLIKE - COMMENTS //

const likePost = async (req, res) => {
  const { communityId } = req.params;
  const { id_user } = req.user;

  try {
    await communityModel.likePost(id_user, communityId);
    res.status(200).json({
      message: 'Post liked successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const unlikePost = async (req, res) => {
  const { communityId } = req.params;
  const { id_user } = req.user;

  try {
    await communityModel.unlikePost(id_user, communityId);
    res.status(200).json({
      message: 'Post unliked successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const commentOnPost = async (req, res) => {
  const { id_user } = req.user;
  const { communityId } = req.params;
  const { comment, comment_img, create_at } = req.body;

  try {
    await communityModel.commentOnPost(id_user, communityId, comment, comment_img, create_at);
    res.status(201).json({
      message: 'Comment on post successful',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    await communityModel.deleteComment(commentId);
    res.status(200).json({
      message: "DELETE post success",
    });
  } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
  }
};

module.exports = {
  getAllCommunity,
  getCommunityById,
  createPostByUser,
  deleteCommunity,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment
};
