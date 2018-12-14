const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name: {type: String, require: true},
    year: {type: Number, require: true, min: 4, max: 4},
    price: {type: Number, require: true},
    genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genres'},
    image: {type: Buffer, require: true},
});

module.exports = mongoose.model('Movies', moviesSchema);