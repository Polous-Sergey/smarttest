const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name: {type: String, require: true},
    year: {type: Number, require: true, min: 1000, max: 9999},
    price: {type: Number, require: true},
    genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genres', require: true},
    image: {type: Buffer, require: true},
});

module.exports = mongoose.model('Movies', moviesSchema);