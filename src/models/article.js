const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: String, required: true },
  link: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'You must enter a valid URL',
    },
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'You must enter a valid URL',
    },
  },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false },
});

module.exports = mongoose.model('Article', articleSchema);
