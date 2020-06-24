const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.check');

const BlogEntries = require('../../models/blog-entries.model');
const User = require('../../models/users.model');

// @route    POST api/blog
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, [check('blogBody', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        '-password -email -regDate'
      );

      const newPost = new BlogEntries({
        author: req.user.id,
        authorName: `${user.firstName} ${user.lastName}`,
        blogBody: req.body.blogBody,
      });

      const post = await newPost.save();
      res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/blog
// @desc     Get all posts
// @access   public
router.get('/', async (req, res) => {
  try {
    const posts = await BlogEntries.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
