const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt')();
const upload = require('../config/multer')();

const ctrlUsers = require('../controllers/users');
const ctrlGenres = require('../controllers/genres');
const ctrlMovies = require('../controllers/movies');

// users
router.post('/users', ctrlUsers.register);
router.post('/users/auth', ctrlUsers.login);
router.get('/users', jwt, ctrlUsers.userList);
router.get('/users/:id', jwt, ctrlUsers.userById);

// genres
router.get('/genres', jwt, ctrlGenres.genresList);
router.get('/genres/:id', jwt, ctrlGenres.genreById);
router.post('/genres',jwt, ctrlGenres.create);
router.delete('/genres/:id', jwt, ctrlGenres.delete);

// movies
// router.get('/movies', jwt, ctrlMovies.genresList);
// router.get('/movies/:id', jwt, ctrlMovies.genreById);
router.post('/movies',jwt, upload.single('image'), ctrlMovies.create);
// router.delete('/movies/:id', jwt, ctrlMovies.delete);

module.exports = router;
