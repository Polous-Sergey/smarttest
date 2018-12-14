const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
};

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function getByEmail(email) {
    return await User.findOne({email: email});
}

async function create(userParam) {
    // validate
    if (!userParam.name || !userParam.email || !userParam.password) {
        throw 'All fields required';
    }

    let name = userParam.name.trim();
    let email = userParam.email.trim();
    let password = userParam.password.trim();

    if (name.length < 5) throw 'Name must be at least 5 letters long';
    if (name.length > 25) throw 'Name must be no more than 25 letters long';

    if (email.length < 8) throw 'Email must be at least 8 characters long';
    if (email.length > 50) throw 'Email must be no more than 50 characters long';

    if (password.length < 1) throw 'Password must be at least 1 characters long';

    if (await getByEmail(email)) {
        throw 'Email ' + email + ' is already taken';
    }

    const user = new User();
    user.name = name;
    user.email = email;
    await user.setPassword(password);

    // save user
    await user.save();

    return user.generateJwt();
}