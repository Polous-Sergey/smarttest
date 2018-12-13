const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

async function register(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            success: true,
            data: null,
            message: 'All fields required'
        });
    }


    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    await user.setPassword(req.body.password);

    user.save(function (err) {
        if (err) {
            res.status(500);
            return res.json({
                "err": err
            });
        }
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });

}

function login(req, res) {

    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', async function (err, user, info) {
        let token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

}

function userList(req, res) {
    User
        .find({}, ['name', 'email'])
        .exec(function (err, users) {
            if(err) return res.status(500).json({
                success: false,
                data: null,
                message: 'cant find users'
            });
            res.status(200).json({
                success: true,
                data: users
            });
        });
}

function userById(req, res) {

    User
        .findById(req.params.id, ['name', 'email'])
        .exec(function (err, user) {
            if(err) return res.status(400).json({
                success: false,
                data: null,
                message: 'cant find user'
            });
            res.status(200).json({
                success: true,
                data: user
            });
        });
}

module.exports = {
    login,
    register,
    userList,
    userById
};
