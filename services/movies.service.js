const mongoose = require('mongoose');
const sharp = require('sharp');
const Movies = mongoose.model('Movies');
const genresService = require('./genres.service');

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete
};

async function getAll() {
    return await Movies.find().populate('genre');
}

async function getById(id) {
    return await Movies.findById(id).populate('genre');
}

async function create(movieParam, file) {
    // validate
    if (!movieParam.name || !movieParam.year || !movieParam.genre || !file || !movieParam.price) {
        throw 'All fields required';
    }

    let name = movieParam.name.trim();
    let year = +movieParam.year.trim();
    let price = +movieParam.price.trim();
    let genre = movieParam.genre.trim();
    let imageBuffer;

    if (name.length < 1) throw 'Name must be at least 1 symbol long';
    if (name.length > 5) throw 'Name must be no more than 5 symbol long';
    if (!price) throw 'Price must contain only numbers';
    if (price < 1) throw 'Price must be more than 1';
    if (!year) throw 'Year must contain only numbers';
    if (year < 1000 || year > 9999) throw 'Year must contain only 4 digits';
    if (genre.length < 5) throw 'Invalid genre id';

    try {
        if (!await genresService.getById(genre)) {
            throw ''
        }
    } catch (err) {
        throw 'Invalid genre id';
    }

    try {
        imageBuffer = await sharp(file.path)
            .resize(100, 200)
            .toBuffer()
    } catch (err) {
        throw err;
    }

    const movie = new Movies();
    movie.name = name;
    movie.year = year;
    movie.price = price;
    movie.genre = genre;
    movie.image = imageBuffer;

    // save movie
    return await movie.save();
}

async function _delete(id) {
    await Movies.findByIdAndRemove(id);
}