const contentsModel = require("../models/contents");

const getAllContents = async (req, res) => {
    try {
      const [data] = await contentsModel.getAllContents();
      res.json({
        message: "GET all contnts success",
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

const getContentById = async (req, res) => {
    const { contentId } = req.params;
    try {
      const [data] = await contentsModel.getContentById(contentId);
      res.json({
        message: "GET content success",
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

const createNewContent = async (req, res) => {
    const { body } = req;
    const image = req.file ? req.file.filename : req.file === undefined ? null : null;
    try {
      await contentsModel.createNewContent(body,image);
      res.status(201).json({
        message: "CREATE new content success",
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

const updateContent = async (req, res) => {
    const { body } = req;
    const {contentId} = req.params;
    const image = req.file ? req.file.filename : req.file === undefined ? null : body.image;
    try {
      await contentsModel.updateContent(body,contentId,image);
      res.status(200).json({
        message: "UPDATE content success",
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

const deleteContent = async (req, res) => {
    const { contentId } = req.params;
    try {
      await contentsModel.deleteContent(contentId);
      res.status(200).json({
        message: "DELETE content success",
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
    getAllContents,
    getContentById,
    createNewContent,
    updateContent,
    deleteContent
}