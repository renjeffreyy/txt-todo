const mongoose = require('mongoose');

const BlogEntriesSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  authorName: {
    type: String,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogBody: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BlogEntries = mongoose.model('blogs', BlogEntriesSchema);
