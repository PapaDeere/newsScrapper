var mongoose = require('mongoose');

// Headline - the title of the article

// Summary - a short summary of the article

// URL - the url to the original article
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  note: {
    type: String,
    required: true
  }
})

var Note = mongoose.model("Note", noteSchema)

module.exports = Note