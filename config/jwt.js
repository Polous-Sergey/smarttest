const expressJwt = require('express-jwt');
const config = require('./main-config');
const usersService = require('../services/users.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked });
}

async function isRevoked(req, payload, done) {
    const user = await usersService.getById(payload._id);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}