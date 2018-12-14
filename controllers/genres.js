const genresService = require('../services/genres.service');

module.exports = {
    create,
    genresList,
    genreById,
    delete: _delete
};

async function create(req, res, next) {
    genresService.create(req.body)
        .then(genre => res.status(200).json({genre}))
        .catch(err => next(err));
}

function genresList(req, res, next) {
    genresService.getAll()
        .then(genres => res.status(200).json(genres))
        .catch(err => next(err));
}

function genreById(req, res, next) {
    genresService.getById(req.params.id)
        .then(genre => genre ? res.status(200).json(genre) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    genresService.delete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}