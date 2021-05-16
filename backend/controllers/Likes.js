'use stric'

const {Likes} = require('../models');

exports.likes = (req, res, next) => {
    const { PostId } = req.body;
    const UserId = req.user.id;
    Likes.findOne({
        where:{ PostId: PostId, UserId: UserId }
    })
    .then((found) => {
        if(!found) {
            Likes.create({
                PostId: PostId,
                UserId: UserId
            })
            .then((like) => {
                console.log(like);
                res.json({liked: true, like: like})
            })
        }else{
            Likes.destroy({
                where: { PostId: PostId, UserId: UserId }
            })
            .then(() => {
                res.json({liked: false})
            })
        }

    })
    .catch(() =>{
        res.status(500).json('Error')
    })

    

};