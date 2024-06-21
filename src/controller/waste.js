const wasteModel = require("../models/waste");

const getAllWaste = async (req, res) => {
    try {
        const [data] = await wasteModel.getAllWaste();
        res.json({
          message: "GET all wastes success",
          success: true,
          data: data,
        });
      } catch (error) {
        res.status(500).json({
          message: "Server Error",
          success: false,
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
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        success: false,
        serverMessage: error.message,
      });
    }
};

const createNewWaste = async (req, res) => {
    const { body } = req;
    const image = req.file ? req.file.filename : req.file === undefined ? null : body.image;
    console.log(image);
    try {
     const [data] = await wasteModel.createNewWaste(body, image);
      res.status(201).json({
        message: "CREATE new waste success",
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        success: false,
        serverMessage: error.message,
      });
    }
};

const updateWaste = async (req, res) => {
    const { body } = req;
    const { wasteId } = req.params;
    const image = req.file ? req.file.filename : req.file === undefined ? null : body.image;
    try {
        const [data] = await wasteModel.updateWaste(body, wasteId, image);
      res.status(200).json({
        message: "UPDATE waste success",
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        success: false,
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

module.exports = { 
    getAllWaste, 
    getWasteById,
    createNewWaste,
    updateWaste,
    deleteWaste 
};