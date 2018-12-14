const multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }
);

module.exports = upload;

function upload() {
    return multer({
        storage: storage,
        limits: {
            fileSize: 2097153
        },
    });
}