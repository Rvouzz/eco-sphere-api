const { dbPool } = require("../config/database");

const getAllWaste =()=>{

    const SQLQuery = "SELECT waste.wasteId, waste.name, waste.description, waste.characteristics, waste.impacts, waste.image, contents.contentId, contents.name as content_name, recycling.recyclingId, recycling.steps as recycling_steps FROM waste join contents on waste.contentId = contents.contentId left join recycling on waste.recyclingId = recycling.recyclingId order by waste.wasteId";
    return dbPool.execute(SQLQuery);
}

const getWasteById = (wasteId) => {
    const SQLQuery ="SELECT waste.wasteId, waste.name, waste.description, waste.characteristics, waste.impacts, waste.image, contents.name as content_name, recycling.steps as recycling_steps FROM waste join contents on waste.contentId = contents.contentId left join recycling on waste.recyclingId = recycling.recyclingId WHERE waste.wasteId = ?";
    return dbPool.execute(SQLQuery, [wasteId]);
}

z

const updateWaste = (body, wasteId, image) => {
    const SQLQuery = "UPDATE waste SET name = ?, description = ?, characteristics = ?, impacts = ?, image = ?, contentId = ? WHERE wasteId = ?"
    const contentValues = [body.name, body.description, body.characteristics, body.impacts, image, body.contentId, wasteId];
    return dbPool.execute(SQLQuery, contentValues);
}

const deleteWaste = (wasteId) => {
  const SQLQuery = "DELETE FROM waste WHERE wasteId = ?";
  return dbPool.execute(SQLQuery, [wasteId]);
};

module.exports = {
  getAllWaste,
  getWasteById,
  createNewWaste,
  updateWaste,
  deleteWaste,
};
