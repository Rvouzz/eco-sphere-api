const communityModel = require('../models/community');

const getAllCommunity = async (req, res) => {
  try {
    const [data] = await communityModel.getAllCommunity();
    res.json({
      message: 'GET all communities success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
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
        success: false,
      });
    }
    res.json({
      message: 'GET community success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
      serverMessage: error.message,
    });
  }
};

const createPostByUser = async (req, res) => {
  const { post } = req.body;
  const { id_user } = req.user;
  const post_img = req.file ? req.file.filename : req.file === undefined ? null : body.post_img;

  try {
    await communityModel.createPostByUser(id_user, post, post_img);
    res.status(201).json({
      message: 'Community post was successful',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
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
      success: true,
    });
  } catch (error) {
      res.status(500).json({
        message: "Server Error",
        success: false,
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
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
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
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
      serverMessage: error.message,
    });
  }
};

const commentOnPost = async (req, res) => {
  const { id_user } = req.user;
  const { communityId } = req.params;
  const { comment, create_at } = req.body;
  const comment_img = req.file ? req.file.filename : req.file === undefined ? null : body.comment_img;

  try {
    await communityModel.commentOnPost(id_user, communityId, comment, comment_img);
    res.status(201).json({
      message: 'Comment on post successful',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
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
      success: true,
    });
  } catch (error) {
      res.status(500).json({
        message: "Server Error",
        success: false,
        serverMessage: error.message,
      });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const [data] = await communityModel.getAllLikes();
    res.json({
      message: 'GET all likes success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
      serverMessage: error.message,
    });
  }
};

const getLikeByCommunityId = async (req, res) => {
  const { communityId } = req.params;
  try {
    const [data] = await communityModel.getLikeByCommunityId(communityId);
    if (data.length === 0) {
      return res.status(404).json({
        message: 'No likes found for this community',
        success: false,
      });
    }
    res.json({
      message: 'GET likes by communityId success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
      serverMessage: error.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const [data] = await communityModel.getAllComments();
    res.json({
      message: 'GET all comments success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
      serverMessage: error.message,
    });
  }
};

const getCommentById = async (req, res) => {
  const { commentId } = req.params;
  try {
    const [data] = await communityModel.getCommentById(commentId);
    if (data.length === 0) {
      return res.status(404).json({
        message: 'Comment not found',
        success: false,
      });
    }
    res.json({
      message: 'GET comment success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
      serverMessage: error.message,
    });
  }
};

const getCommentByCommunityId = async (req, res) => {
  const { communityId } = req.params;
  try {
    const [data] = await communityModel.getCommentByCommunityId(communityId);
    if (data.length === 0) {
      return res.status(404).json({
        message: 'No comments found for this community',
        success: false,
      });
    }
    res.json({
      message: 'GET comments by communityId success',
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      success: false,
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
  deleteComment,
  getAllLikes,
  getLikeByCommunityId,
  getAllComments,
  getCommentByCommunityId,
  getCommentById
};