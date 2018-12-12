const Genres = require('../models/genres');

function genresGetAll(req, res) {
    Genres.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err: err
            });
        }

        res.json({
            success: true,
            data: data
        });
    });
}

function genresGetById(req, res) {
    Genres.findById(req.params.id, (err, genres) => {
        if (err || !product) {
            return res.json({
                succes: false,
            });
        }
        res.status(200);
        res.json({
            succes: true,
            genres: genres
        });
    })
}

function genresPost(req, res) {
    let genres = new Genres();
    genres.name = req.body.name;
    genres.save((err, data) => {
        if(err) {
            return res.json({
                success: false,
                err: err
            });
        }
        return res.json({
            success: true,
            data: data
        });
    });
}

function genresPut(req, res) {
    Genres.findById(req.params.id, (err, genres) => {
        if (err || !product) {
            return res.json({
                succes: false,
            });
        }
        genres.name = req.body.name;
        genres.save((err, data) => {
            if(err) {
                return res.json({
                    success: false,
                    err: err
                });
            }
            return res.json({
                success: true,
                data: data
            });
        });
    })
}

function genresDelete(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

module.exports = {
    genresGetAll,
    genresGetById,
    genresPost,
    genresPut,
    genresDelete
};