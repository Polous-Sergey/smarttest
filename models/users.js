const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String
});

userSchema.methods.setPassword = async function (password) {
    let salt = await bcrypt.genSalt(12);
    this.hash = await bcrypt.hash(password, salt)
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.hash);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, "MY_SECRET");
};

mongoose.model('User', userSchema);
