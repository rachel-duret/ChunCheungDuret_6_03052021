'use stric'

const {Posts} = require('../models');



exports.getAllPost = (req, res, next) => {
    Posts.findAll()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(400).json({error});
    });

};

exports.createPost = (req, res, next) => {
    const post = req.body;
    const username = req.user.username
    console.log(username);
    Posts.create(post)
    .then((post) => {
        res.status(201).json({post})
    })
    .catch((error) => {
        res.status(400).json({error});
    });
};

exports.findOnePost = (req, res, next) => {
    const id = req.params.id;
    Posts.findByPk(id)
    .then((postUnique) => {
        res.status(200).json(postUnique)
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}