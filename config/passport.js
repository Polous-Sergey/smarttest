const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, done) {
        User.findOne({email: email}, async function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            if (!await user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            return done(null, user);
        });
    }
));