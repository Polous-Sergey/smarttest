const mongoose = require('mongoose');
const Movies = mongoose.model('Genres');

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

async function create(MovieParam) {
    // validate
    if (!MovieParam.name) {
        throw 'Name field required';
    }

    let name = genreParam.name.trim();

    if(name.length < 1) throw 'Name must be at least 1 letters long';

    if (await Genres.findOne({ name: name })) {
        throw 'Genre "' + name + '" is already taken';
    }

    const genre = new Genres();
    genre.name = name;

    // save genre
    return await genre.save();
}

async function _delete(id) {
    await Movies.findByIdAndRemove(id);
}