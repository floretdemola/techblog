const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// new post
router.post('/', withAuth, async (req, res) => {
    try {
        const body = req.body;
        const newPost = await Post.create(
        { 
         ...body, userID: req.session.userID,
        });

        req.statusCode(200).json(newPost);
        } catch (err) {
            res.status(500).json(err);
        }
});

// update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
        },
    });
    
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete post

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});