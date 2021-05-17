'use stric'

const {Users} = require('../models');

const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const {username, email, password} = req.body
    bcrypt.hash(password, 10)
    .then((hash)=>{
        Users.create({
            username: username,
            email: email,
            password: hash
        })
        res.status(201).json('User create success')
    })
    .catch((error) => {
        res.status(500).json({error});
    });
    
};

exports.login = (req, res, next) => {
    const {username, email, password} = req.body;
    Users.findOne({ where: {
        username: username,
        email: email
    }})
    .then((user) => {
        console.log(user);
        if(!user) {
             res.json({error:'User does not exist !'})
        }
        bcrypt.compare(password, user.password)
        .then((match) => {
            if(!match) {
                 res.json({error:'Wrong email or password !'})
            }
            const accessToken = sign(
                { username:username, id:user.id },
                'RANDOM_TOKEN_SECRET'             
            );
            res.json({
                username:username,
                token:accessToken,
                id:user.id
            });
        })
        
    }) 
    .catch((error) =>{
        res.status(500).json({error})
    })
}
exports.info = (req, res, next) => {
    const user = req.user
    res.json(user)
    
} ;

exports.profile = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    Users.findByPk(id, {
        attributes: { exclude: ["password"]},// no password send back 
    })
    .then((userInfo) => {
        res.json(userInfo)
    })
}