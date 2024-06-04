const { dbPool } = require("../config/database");

const getAllWaste = () => {
  const SQLQuery =
    "SELECT waste.name, waste.description, waste.characteristics, waste.impacts, waste.image, contents.name as content_name FROM waste left join contents on waste.contentId = contents.contentId order by waste.name";
  return dbPool.execute(SQLQuery);
};

const getWasteById = (wasteId) => {
  const SQLQuery =
    "SELECT waste.name, waste.description, waste.characteristics, waste.impacts, waste.image, contents.name as content_name FROM waste left join contents on waste.contentId = contents.contentId WHERE waste.wasteId = ?";
  return dbPool.execute(SQLQuery, [wasteId]);
};

const createNewWaste = (body, image) => {
  const SQLQuery =
    "INSERT INTO waste (name, description, characteristics, impacts, image, recyclingId, contentId) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const contentValues = [
    body.name,
    body.description,
    body.characteristics,
    body.impacts,
    image.buffer,
    body.recyclingId,
    body.contentId,
  ];
  return dbPool.execute(SQLQuery, contentValues);
};

const updateWaste = (body, wasteId, image) => {
  const SQLQuery =
    "UPDATE waste SET name = ?, description = ?, characteristics = ?, impacts = ?, image = ?, contentId = ? WHERE wasteId = ?";
  const contentValues = [
    body.name,
    body.description,
    body.characteristics,
    body.impacts,
    image.buffer,
    body.contentId,
    wasteId,
  ];
  return dbPool.execute(SQLQuery, contentValues);
};

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
