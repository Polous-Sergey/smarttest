const fs = require('fs');
const sharp = require('sharp');
const moviesService = require('../services/users.service');

module.exports = {
    create,
    // userList,
    // userById
};

async function create(req, res, next) {
    console.log(req.file.buffer);

    // res.sendStatus(200);

    sharp(req.file.path)
        .rotate()
        .resize(200)
        .toBuffer()
        .then(data => res.send(data))
        .catch(err => res.send(err));

    // res.send(fs.readFileSync(req.file.path));

    // moviesService.create(req.body)
    //     .then(token => res.status(200).json({token}))
    //     .catch(err => next(err));
}

// function getAll(req, res) {
//     moviesService.getAll()
//         .then(users => res.status(200).json(users))
//         .catch(err => next(err));
// }
//
// function getById(req, res) {
//     moviesService.getById(req.params.id)
//         .then(user => user ? res.status(200).json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }


