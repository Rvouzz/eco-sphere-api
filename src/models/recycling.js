const dbPool = require("../config/database");

const getAllRecycling = () => {
    const SQLQuery = "SELECT recycling.recyclingId, recycling.steps, waste.name as waste_type FROM recycling left join waste on recycling.wasteId = waste.wasteId ORDER BY recycling.recyclingId";
    return dbPool.execute(SQLQuery);
};

const getRecyclingById = (recyclingId) => {
    const SQLQuery = "SELECT recycling.recyclingId, recycling.steps, waste.name as waste_type FROM recycling left join waste on recycling.wasteId = waste.wasteId WHERE recycling.recyclingId = ?";
    return dbPool.execute(SQLQuery, [recyclingId]);
};

const createNewRecycling = (body) => {
    const SQLQuery = "INSERT INTO recycling (steps, wasteId) VALUES (?, ?)";
    const contentValues = [body.steps, body.wasteId];
    return dbPool.execute(SQLQuery, contentValues);
};

const updateRecycling = (body, recyclingId) => {
    const SQLQuery = "UPDATE recycling SET steps = ?, wasteId = ? WHERE recyclingId = ?";
    const contentValues = [body.steps, body.wasteId, recyclingId];
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