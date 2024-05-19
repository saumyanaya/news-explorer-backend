const { BadRequestError } = require("../../utils/BadRequestError");
const { NotFoundError } = require("../../utils/NotFoundError");
const Article = require("../models/article");
const {
  INVALID_CREDENTIALS,
  ARTICLE_NOT_FOUND,
  NOT_OWNER,
} = require("../../utils/constants");
const { ForbiddenError } = require("../../utils/ForbiddenError");

exports.getSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const articles = await Article.find({ owner: userId });
    res.json(articles);
  } catch (err) {
    next(new BadRequestError(INVALID_CREDENTIALS));
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const { keyword, title, text, date, source, link, image } = req.body;
    const newArticle = new Article({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    if (err.name === `ValidationError`) {
      next(new BadRequestError(INVALID_CREDENTIALS));
    }
    next(err);
  }
};
exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => new NotFoundError(ARTICLE_NOT_FOUND))
    .then((article) => {
      if (userId !== article.owner.toString()) {
        throw new ForbiddenError(NOT_OWNER);
      }
      return Article.findByIdAndRemove(articleId)
        .orFail(() => new NotFoundError(ARTICLE_NOT_FOUND))
        .then((deletedArticle) => res.send(deletedArticle))
        .catch(next);
    })
    .catch(next);
};
