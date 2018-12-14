const moviesService = require('../services/movies.service');

module.exports = {
    create,
    moviesList,
    movieById,
    delete: _delete
};

async function create(req, res, next) {
    moviesService.create(req.body, req.file)
        .then(movie => res.status(200).json(movie))
        .catch(err => next(err));
}

function moviesList(req, res, next) {
    moviesService.getAll()
        .then(movies => res.status(200).json(movies))
        .catch(err => next(err));
}

function movieById(req, res, next) {
    moviesService.getById(req.params.id)
        .then(movie => movie ? res.status(200).json(movie) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    moviesService.delete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}


