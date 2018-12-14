const passport = require('passport');
const usersService = require('../services/users.service');

module.exports = {
    login,
    register,
    userList,
    userById
};

async function register(req, res, next) {
    usersService.create(req.body)
        .then(token => res.status(200).json({token}))
        .catch(err => next(err));
}

function login(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields required'
        });
    }

    passport.authenticate('local', {}, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.status(200)
                .json({
                    token: user.generateJwt()
                });
        }
        res.status(401).json(info);
    })(req, res);
}

function userList(req, res, next) {
    usersService.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => next(err));
}

function userById(req, res, next) {
    usersService.getById(req.params.id)
        .then(user => user ? res.status(200).json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzEzOWI5OWIxMGZjNTUyZDRlZTNjMjkiLCJpYXQiOjE1NDQ3ODk2Mjd9.X5GJ_b5tAfWvosi-RkAIkc_nsAi0nNf2FW5CYN31adU

// 5c139b99b10fc552d4ee3c29
