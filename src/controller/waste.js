const wasteModel = require("../models/waste");

const getAllWaste = async (req, res) => {
    try {
        const [data] = await wasteModel.getAllWaste();
        res.json({
          message: "GET all wastes success",
          data: data,
        });
      } catch (error) {
        res.status(500).json({
          message: "Server Error",
          serverMessage: error.message,
        });
      }
};

const getWasteById = async (req, res) => {
    const { wasteId } = req.params;
    try {
      const [data] = await wasteModel.getWasteById(wasteId);
      res.json({
        message: "GET waste success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

const createNewWaste = async (req, res) => {
    const { body } = req;
    const image = req.file ? req.file.buffer : null;
    try {
     const [data] = await wasteModel.createNewWaste(body, image);
      res.status(201).json({
        message: "CREATE new waste success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

const updateWaste = async (req, res) => {
    const { body } = req;
    const { wasteId } = req.params;
    const image = req.file ? req.file.buffer : body.image;
    try {
        const [data] = await wasteModel.updateWaste(body, wasteId, image);
      res.status(200).json({
        message: "UPDATE waste success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

const deleteWaste = async (req, res) => {
    const { wasteId } = req.params;
    try {
      await wasteModel.deleteWaste(wasteId);
      res.status(200).json({
        message: "DELETE waste success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

module.exports = { 
    getAllWaste, 
    getWasteById,
    createNewWaste,
    updateWaste,
    deleteWaste 
};