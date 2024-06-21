const recyclingModel = require("../models/recycling");

const getAllRecycling = async (req,res) => {
    try {
        const [data] = await recyclingModel.getAllRecycling();
        res.json({
          message: "GET all contents success",
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

const getRecyclingById = async (req, res) => {
    const { recyclingId } = req.params;
    try {
      const [data] = await recyclingModel.getRecyclingById(recyclingId);
      res.json({
        message: "GET recycling success",
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

const createNewRecycling = async (req, res) => {
    const { body } = req;
    const image = req.file ? req.file.filename : req.file === undefined ? null : null;
    try {
      await recyclingModel.createNewRecycling(body, image);
      res.status(201).json({
        message: "CREATE new recycling success",
        success: true,
        data: req.body,
      });
    } catch (error) {
        res.status(500).json({
          message: "Server Error",
          success: false,
          serverMessage: error.message,
        });
    }
};

const updateRecycling = async (req, res) => {
  const { body } = req;
  const { recyclingId } = req.params;
  let images = [];

  if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.filename);
  }

  if (body.existingImages) {
      if (typeof body.existingImages === 'string') {
          body.existingImages = [body.existingImages];
      }

      images = [...body.existingImages, ...images];
  }

  console.log(images);

  try {
      await recyclingModel.updateRecycling(body, recyclingId, images);
      res.status(200).json({
          message: "UPDATE recycling success",
          success: true,
          data: {
              ...body,
              images,
          },
      });
  } catch (error) {
      res.status(500).json({
          message: "Server Error",
          success: false,
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
    getAllRecycling, 
    getRecyclingById,
    createNewRecycling,
    updateRecycling,
    deleteRecycling
}