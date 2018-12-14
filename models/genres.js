const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
});

module.exports = mongoose.model('Genres', genresSchema);