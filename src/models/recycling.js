const dbPool = require("../config/database");

const getAllRecycling = () => {
    const SQLQuery = "SELECT recycling.recyclingId, recycling.steps, recycling.image, waste.name as waste_type FROM recycling left join waste on recycling.wasteId = waste.wasteId ORDER BY recycling.recyclingId";
    return dbPool.execute(SQLQuery);
};

const getRecyclingById = (recyclingId) => {
    const SQLQuery = "SELECT recycling.recyclingId, recycling.steps, recycling.image, waste.name as waste_type FROM recycling left join waste on recycling.wasteId = waste.wasteId WHERE recycling.recyclingId = ?";
    return dbPool.execute(SQLQuery, [recyclingId]);
};

const createNewRecycling = (body, image) => {
    const SQLQuery = "INSERT INTO recycling (steps, image, wasteId) VALUES (?, ?, ?)";
    const contentValues = [body.steps, image.buffer, body.wasteId];
    return dbPool.execute(SQLQuery, contentValues);
};

const updateRecycling = (body, recyclingId, image) => {
    const SQLQuery = "UPDATE recycling SET steps = ?, image = ?, wasteId = ? WHERE recyclingId = ?";
    const contentValues = [body.steps, image.buffer, body.wasteId, recyclingId];
    return dbPool.execute(SQLQuery, contentValues);
};

const deleteRecycling = (recyclingId) => {
    const SQLQuery = "DELETE FROM recycling WHERE recyclingId = ?";
    return dbPool.execute(SQLQuery, [recyclingId]);
};


module.exports = { 
    getAllRecycling, 
    getRecyclingById,
    createNewRecycling,
    updateRecycling,
    deleteRecycling
}