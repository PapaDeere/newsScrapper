var mongoose = require('mongoose');

// Headline - the title of the article

// Summary - a short summary of the article

// URL - the url to the original article
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

var Article = mongoose.model("Article", articleSchema)

module.exports = Article