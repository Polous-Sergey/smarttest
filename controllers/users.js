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

    passport.authenticate('local', cb)(req, res);

    function cb(err, user, info) {
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
    }
}

function userList(req, res) {
    usersService.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => next(err));
}

function userById(req, res) {
    usersService.getById(req.params.id)
        .then(user => user ? res.status(200).json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


