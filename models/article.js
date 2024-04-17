const mongoose = require("mongoose");
const validator = require("validator");

const articleItemSchema = new mongoose.Schema({
  type: "object",
  properties: {
    keyword: {
      type: "string",
      description: "The word by which the articles are searched.",
      required: true,
    },
    title: {
      type: "string",
      description: "The article title.",
      required: true,
    },
    text: {
      type: "string",
      description: "The article text.",
      required: true,
    },
    date: {
      type: "string",
      description: "The article date.",
      format: "date-time",
      required: true,
    },
    source: {
      type: "string",
      description: "The article source.",
      required: true,
    },
    link: {
      type: "string",
      format: "uri",
      description: "A link to the article.",
      required: true,
    },
    image: {
      type: "string",
      format: "uri",
      description: "A link to the image for the article.",
      required: true,
    },
    owner: {
      type: "string",
      description:
        "The _id of the user who saved the article. Not returned by default.",
      required: true,
    },
  },
});
module.exports = mongoose.model("articleItem", articleItemSchema);
