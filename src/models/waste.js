const dbPool = require("../config/database");

const getAllWaste =()=>{

    const SQLQuery = "SELECT waste.name, waste.description, waste.characteristics, waste.impacts, contents.name as content_name FROM waste left join contents on waste.contentId = contents.contentId order by waste.name";
    return dbPool.execute(SQLQuery);
}

const getWasteById = (wasteId) => {
    const SQLQuery ="SELECT waste.name, waste.description, waste.characteristics, waste.impacts, contents.name as content_name FROM waste left join contents on waste.contentId = contents.contentId WHERE waste.wasteId = ?";
    return dbPool.execute(SQLQuery, [wasteId]);
}

const createNewWaste = (body) => {
    const SQLQuery = "INSERT INTO waste (name, description, characteristics, impacts, recyclingId, contentId) VALUES (?, ?, ?, ?, ?, ?)";
    const contentValues = [body.name, body.description, body.characteristics, body.impacts, body.recyclingId, body.contentId];
    return dbPool.execute(SQLQuery, contentValues);
}

const updateWaste = (body, wasteId) => {
    const SQLQuery = "UPDATE waste SET name = ?, description = ?, characteristics = ?, impacts = ?, contentId = ? WHERE wasteId = ?"
    const contentValues = [body.name, body.description, body.characteristics, body.impacts, body.contentId, wasteId];
    return dbPool.execute(SQLQuery, contentValues);
}

const deleteWaste = (wasteId) => {
    const SQLQuery = "DELETE FROM waste WHERE wasteId = ?";
    return dbPool.execute(SQLQuery, [wasteId]);
}

module.exports = { 
    getAllWaste,
    getWasteById, 
    createNewWaste,
    updateWaste,
    deleteWaste
};