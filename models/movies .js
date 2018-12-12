const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name: {type: String, require: true},
    year: {type: Number, require: true},
    price: {type: Number, require: true},
    genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genres'},
    image: {type: String, require: true},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Movies', moviesSchema);