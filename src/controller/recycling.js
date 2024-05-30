const recyclingModel = require("../models/recycling");

const getAllRecycling = async (req,res) => {
    try {
        const [data] = await recyclingModel.getAllRecycling();
        res.json({
          message: "GET all contnts success",
          data: data,
        });
      } catch (error) {
        res.status(500).json({
          message: "Server Error",
          serverMessage: error.message,
        });
      }
};

const getRecyclingById = async (req, res) => {
    const { recyclingId } = req.params;
    try {
      const [data] = await recyclingModel.getRecyclingById(recyclingId);
      res.json({
        message: "GET recycling success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

const createNewRecycling = async (req, res) => {
    const { body } = req;
    const image = req.file;
    try {
      await recyclingModel.createNewRecycling(body, image);
      res.status(201).json({
        message: "CREATE new recycling success",
        data: req.body,
      });
    } catch (error) {
        res.status(500).json({
          message: "Server Error",
          serverMessage: error.message,
        });
    }
};

const updateRecycling = async (req, res) => {
    const { body } = req;
    const { recyclingId } = req.params;
    const image = req.file;
    try {
      await recyclingModel.updateRecycling(body, recyclingId, image);
      res.status(200).json({
        message: "UPDATE recycling success",
        data: req.body,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

const deleteRecycling = async (req, res) => {
    const { recyclingId } = req.params;
    try {
      await recyclingModel.deleteRecycling(recyclingId);
      res.status(200).json({
        message: "DELETE recycling success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

module.exports = { 
    getAllRecycling, 
    getRecyclingById,
    createNewRecycling,
    updateRecycling,
    deleteRecycling
}