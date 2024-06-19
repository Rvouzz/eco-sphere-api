const {dbPool} = require("../config/database");

const getAllContents = () => {
    const SQLQuery = "SELECT contents.contentId, contents.name, contents.description, contents.image FROM contents"; 
    return dbPool.execute(SQLQuery);
};

const getContentById = (contentId) => {
    const SQLQuery = "SELECT contents.contentId, contents.name, contents.description, contents.image, waste.name as waste_name FROM contents left join waste on contents.wasteId = waste.wasteId WHERE contents.contentId = ?";
    return dbPool.execute(SQLQuery, [contentId]);
};

const createNewContent = (body, image) => {
    console.log(body,image);
    const SQLQuery = "INSERT INTO contents (name, description, image) VALUES (?, ?, ?)";
    const contentValues = [body.name, body.description, image];
    console.log(contentValues);
    return dbPool.execute(SQLQuery, contentValues);
};

const updateContent = (body,contentId,image) => {
    const SQLQuery = "UPDATE contents SET name = ?, description = ?, image = ? WHERE contentId = ?";
    const contentValues = [body.name, body.description, image, contentId];
    return dbPool.execute(SQLQuery, contentValues);
};

const deleteContent = (contentId) => {
    const SQLQuery = "DELETE FROM contents WHERE contentId = ?";
    return dbPool.execute(SQLQuery, [contentId]);
};

module.exports = {
    getAllContents,
    getContentById,
    createNewContent,
    updateContent,
    deleteContent
}