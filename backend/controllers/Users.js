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
        if(!user) {
             res.json({error:'User does not exist !'})
        }
        bcrypt.compare(password, user.password)
        .then((match) => {
            if(!match) {
                 res.json({error:'Wrong email or password !'})
            }
            let accessToken = sign(
                {username:username},
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            );
            res.json({
                username:username,
                accessToken
            });
        })
        
    }) 
    .catch((error) =>{
        res.status(500).json({error})
    })
    

}