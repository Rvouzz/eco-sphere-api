const { dbPool } = require("../config/database");

const getAllCommunity = () => {
  const SQLQuery = `
    SELECT 
      community.communityId, 
      community.post, 
      community.post_img, 
      user.id_user, 
      user.email,
      user.img_profile,
      community.created_at
    FROM 
      community
    LEFT JOIN 
      user 
    ON 
      community.id_user = user.id_user
    ORDER BY 
      community.communityId
  `; 
  return dbPool.execute(SQLQuery);
};

const getCommunityById = (communityId) => {
  const SQLQuery = `
    SELECT 
      community.communityId, 
      community.post, 
      community.post_img, 
      user.id_user, 
      user.email,
      user.img_profile,
      community.created_at
    FROM 
      community
    LEFT JOIN 
      user 
    ON 
      community.id_user = user.id_user
    WHERE 
      community.communityId = ?
  `; 
  return dbPool.execute(SQLQuery, [communityId]);
};

const createPostByUser = (id_user, post, post_img) => {
  console.log(post_img);
  const SQLQuery = `
    INSERT INTO community (id_user, post, post_img, created_at)
    VALUES (?, ?, ?, NOW()) 
  `;
  return dbPool.execute(SQLQuery, [id_user, post, post_img]);
};

const deleteCommunity = async (communityId) => {
  const deleteLikesQuery = "DELETE FROM likes WHERE communityId = ?";
  const deleteCommentsQuery = "DELETE FROM comments WHERE communityId = ?";
  const deleteCommunityQuery = "DELETE FROM community WHERE communityId = ?";

  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute(deleteLikesQuery, [communityId]);
    await connection.execute(deleteCommentsQuery, [communityId]);
    await connection.execute(deleteCommunityQuery, [communityId]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// LIKE - UNLIKE - COMMENTS //

const likePost = (id_user, communityId) => {
  const SQLQuery = `
    INSERT INTO likes (id_user, communityId)
    VALUES (?, ?)
  `;
  return dbPool.execute(SQLQuery, [id_user, communityId]);
};

const unlikePost = (id_user, communityId) => {
  const SQLQuery = `
    DELETE FROM likes 
    WHERE id_user = ? AND communityId = ?
  `;
  return dbPool.execute(SQLQuery, [id_user, communityId]);
};

const commentOnPost = (id_user, communityId, comment, comment_img) => {
  const SQLQuery = `
    INSERT INTO comments (id_user, communityId, comment, comment_img, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  console.log(id_user,communityId,comment,comment_img);
  return dbPool.execute(SQLQuery, [id_user, communityId, comment, comment_img || null]);
};

const getAllLikes = () => {
  const SQLQuery = `
    SELECT 
      likes.likeId, 
      likes.communityId, 
      likes.id_user, 
      user.email
    FROM 
      likes
    LEFT JOIN 
      user 
    ON 
      likes.id_user = user.id_user
    ORDER BY 
      likes.likeId
  `;
  return dbPool.execute(SQLQuery);
};

const getLikeByCommunityId = (communityId) => {
  const SQLQuery = `
    SELECT 
      likes.likeId, 
      likes.communityId, 
      likes.id_user, 
      user.email
    FROM 
      likes
    LEFT JOIN 
      user 
    ON 
      likes.id_user = user.id_user
    WHERE 
      likes.communityId = ?
    ORDER BY 
      likes.likeId
  `;
  return dbPool.execute(SQLQuery, [communityId]);
};

const getAllComments = () => {
  const SQLQuery = `
    SELECT 
      comments.commentId, 
      comments.communityId, 
      comments.id_user, 
      comments.comment, 
      comments.comment_img, 
      comments.created_at, 
      user.email,
      user.img_profile
    FROM 
      comments
    LEFT JOIN 
      user 
    ON 
      comments.id_user = user.id_user
    ORDER BY 
      comments.commentId
  `;
  return dbPool.execute(SQLQuery);
};

const getCommentById = (commentId) => {
  const SQLQuery = `
    SELECT 
      comments.commentId, 
      comments.communityId, 
      comments.id_user, 
      comments.comment, 
      comments.comment_img, 
      comments.created_at, 
      user.email,
      user.img_profile
    FROM 
      comments
    LEFT JOIN 
      user 
    ON 
      comments.id_user = user.id_user
    WHERE 
      comments.commentId = ?
  `;
  return dbPool.execute(SQLQuery, [commentId]);
};

const getCommentByCommunityId = (communityId) => {
  const SQLQuery = `
    SELECT 
      comments.commentId, 
      comments.communityId, 
      comments.id_user, 
      comments.comment, 
      comments.comment_img, 
      comments.created_at, 
      user.email,
      user.img_profile
    FROM 
      comments
    LEFT JOIN 
      user 
    ON 
      comments.id_user = user.id_user
    WHERE 
      comments.communityId = ?
  `;
  return dbPool.execute(SQLQuery, [communityId]);
};

const deleteComment = (commentId) => {
  const SQLQuery = "DELETE FROM comments WHERE commentId = ?";
  return dbPool.execute(SQLQuery, [commentId]);
};

module.exports = {
  getAllCommunity,
  getCommunityById,
  createPostByUser,
  deleteCommunity,
  likePost,
  unlikePost,
  commentOnPost,
  getAllComments,
  getAllLikes,
  getLikeByCommunityId,
  getCommentById,
  getCommentByCommunityId,
  deleteComment
};