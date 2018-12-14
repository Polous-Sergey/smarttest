const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersService = require('../services/users.service');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, done) {
        usersService.getByEmail(email)
            .then(async (user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!await user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
));