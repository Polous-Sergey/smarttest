const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    img: Buffer
});

module.exports = mongoose.model('Image', imageSchema);