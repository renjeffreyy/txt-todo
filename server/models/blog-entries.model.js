const mongoose = require('mongoose');

const BlogEntriesSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  authorName: {
    type: String,
  },
  blogBody: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = BlogEntries = mongoose.model('blogs', BlogEntriesSchema);
