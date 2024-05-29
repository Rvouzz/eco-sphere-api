const contentsModel = require("../models/contents");

const getAllContents = async (req, res) => {
    try {
      const [data] = await contentsModel.getAllContents();
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

const getContentById = async (req, res) => {
    const { contentId } = req.params;
    try {
      const [data] = await contentsModel.getContentById(contentId);
      res.json({
        message: "GET content success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
};

const createNewContent = async (req, res) => {
    const { body } = req;
    try {
      await contentsModel.createNewContent(body);
      res.status(201).json({
        message: "CREATE new content success",
        data: req.body,
      });
    } catch (error) {
        res.status(500).json({
          message: "Server Error",
          serverMessage: error.message,
        });
    }
};

const updateContent = async (req, res) => {
    const { body } = req;
    const {contentId} = req.params;
    try {
      await contentsModel.updateContent(body,contentId);
      res.status(200).json({
        message: "UPDATE content success",
        data: req.body,
      });
    } catch (error) {
        res.status(500).json({
          message: "Server Error",
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
      });
    } catch (error) {
        res.status(500).json({
          message: "Server Error",
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