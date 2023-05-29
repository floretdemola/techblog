const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [User],
        });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', {
        posts
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await post.findOne({
          where: {id: req.params.id},
          include: [
            User,
           {
            model: Comment,
            include: [User],
           },
          ],
        });
      if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('single-post', { post });
      } else {
        res.status(404).json({ message: 'No post found with this id' });
        }
      } catch (err) {
        res.status(500).json(err);
      }
  });

router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
          res.redirect('/');
          return;
        }
        res.render('login');
        } catch (err) {
          res.status(500).json(err);
        }
});

router.get('/signup', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
      }
      res.render('signup');
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;
  