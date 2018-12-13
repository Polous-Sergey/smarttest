const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function (req, file, cb) {
            let arr = file.originalname.split('.');
            let type = arr[arr.length - 1];
            cb(null, Date.now() + '.' + type);
        }
    }
);
const upload = multer({storage: storage});

const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const ctrlUsers = require('../controllers/users');
const ctrlGenres = require('../controllers/genres');

// users
router.post('/users', ctrlUsers.register);
router.post('/users/auth', ctrlUsers.login);
router.get('/users', auth, ctrlUsers.userList);
router.get('/users/:id', auth, ctrlUsers.userById);

// genres
router.get('/genres ', ctrlGenres.genresGetAll);
router.get('/genres/:id ', ctrlGenres.genresGetById);
router.post('/genres ', ctrlGenres.genresPost);
router.put('/genres ', ctrlGenres.genresPut);
router.delete('/genres ', ctrlGenres.genresDelete);


// image
// router.get('/image/:id', ctrlImage.imageGetByID);
// price-list
// router.post('/price-list', upload.fields([{name: 'image', maxCount: 1}, {
//     name: 'listImage',
//     maxCount: 1
// }]), ctrlPriceList.priceListPost);
// router.put('/price-list/:id', upload.fields([{name: 'image', maxCount: 1}, {
//     name: 'listImage',
//     maxCount: 1
// }]), ctrlPriceList.priceListPut);

module.exports = router;
