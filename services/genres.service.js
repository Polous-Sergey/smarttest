const mongoose = require('mongoose');
const Genres = mongoose.model('Genres');

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete
};

async function getAll() {
    return await Genres.find();
}

async function getById(id) {
    return await Genres.findById(id);
}

async function create(genreParam) {
    // validate
    if (!genreParam.name) {
        throw 'Name field required';
    }

    let name = genreParam.name.trim();

    if(name.length < 3) throw 'Name must be at least 3 letters long';

    if (await Genres.findOne({ name: name })) {
        throw 'Genre "' + name + '" is already taken';
    }

    const genre = new Genres();
    genre.name = name;

    // save genre
    return await genre.save();
}

async function _delete(id) {
    await Genres.findByIdAndRemove(id);
}