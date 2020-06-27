const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.check');
const checkObjectId = require('../../middleware/checkObjectId');

const BlogEntries = require('../../models/blog-entries.model');
const User = require('../../models/users.model');

// @route    POST api/blog
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('blogBody', 'Text is required, max 400 Characters').isLength({
        min: 1,
        max: 400,
      }),
      check('blogTitle', 'Please include a title for your post')
        .not()
        .isEmpty(),
    ],
  ],
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
        blogTitle: req.body.blogTitle,
        authorName: `${user.firstName} ${user.lastName}`,
        blogBody: req.body.blogBody,
      });

      const post = await newPost.save();
      res.status(200).json({ msg: 'Thank you for the post!' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' });
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
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route    DELETE api/blog/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await BlogEntries.findById(req.params.id);

    // Check user
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send({ msg: 'Server Error' });
  }
});

module.exports = router;
