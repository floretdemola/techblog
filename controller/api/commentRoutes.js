const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// get + serialize

router.get('/', async (req, res) => {
  try{
    const commentData = await Comment.findAll();
    const comments = commentData.map(comment => comment.get({ plain: true }));

    console.log(comments);

    res.json(comments);
  } catch(err) {
    res.status(500).json(err);
  }
});

// post comment

router.post('/:post_id', withAuth, async (req, res) => {
  try {
    const body = req.body;
    const post_id = req.params;

    const newComment = await Comment.create({
      ...body,
      user_id: req.session.user_id,
      post_id
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;