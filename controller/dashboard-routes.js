const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: { "userId": req.session.userId },
        include: [User],
        });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', {
        posts,
        logged_in: req.session.logged_in
    });
    } catch (err) {
      res.status(500).json(err);
      res.redirect('login');
    }
});

router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('new-post', { 
        layout: 'dashboard',
     });
      } catch (err) {
        res.status(500).json(err);
      }
  });

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User],
            });
        if (postData) {
        const post = postData.get({ plain: true });
        console.log(post);
        res.render('edit-post', {
            post,
            layout: 'dashboard',
        });
        } else {
            res.status(404).json({ message: 'No post found with this id' });
        }} catch (err) {
            res.status(500).json(err);
        }
});
module.exports = router;
  