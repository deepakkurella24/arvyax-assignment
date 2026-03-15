const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  ambience: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  analysis: {
    emotion: String,
    keywords: [String],
    summary: String
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Journal", JournalSchema);