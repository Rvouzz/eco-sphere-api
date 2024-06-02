const { dbPool } = require("../config/database");

const getAllCommunity = () => {
  const SQLQuery = `
    SELECT 
      community.communityId, 
      community.post, 
      community.post_img, 
      user.id_user, 
      user.email
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
      user.email
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
  return dbPool.execute(SQLQuery, [id_user, post, post_img.buffer || null]);
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
  return dbPool.execute(SQLQuery, [id_user, communityId, comment, comment_img.buffer || null]);
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
  deleteComment
};