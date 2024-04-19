const Article = require("../models/article");

// Get all articles saved by the user
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create an article
const createArticle = async (req, res) => {
  try {
    const { keyword, title, text, date, source, link, image } = req.body;
    const article = new Article({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an article by ID
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.articleId,
      owner: req.user._id,
    });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllArticles, createArticle, deleteArticle };
