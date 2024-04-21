const Article = require('../models/article');

exports.getSavedArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const articles = await Article.find({ owner: userId });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const newArticle = new Article({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user.id,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;
    await Article.findOneAndDelete({ _id: articleId, owner: userId });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
