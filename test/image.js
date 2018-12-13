const Image = require('../models/image');
const fs = require('fs');


function imageGetByID(req, res) {
    // Image.findById({_id: req.params.id}, (err, image) => {
    //     if (err || !image) {
    //         return res.json({
    //             succes: false,
    //         });
    //     }
    //     res.send(image.img)
    // });
    // fs.unlink('uploads/' + req.params.id);
    let image = fs.readFileSync('uploads/' + req.params.id);
    res.contentType('image/jpeg');
    res.send(image)
}

function imagePost(req, res) {
    console.log(req.body);
    let newItem = new Image();
    newItem.img = fs.readFileSync(req.file.path);
    newItem.save((err, data) => {
        if (err) {
            return res.json({
                success: false,
                err: err
            });
        }
        return res.json({
            success: true,
            data: data,
            req: req.file
        });
    });
}


function imagePut(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

function imageDelete(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

module.exports = {
    imageGetByID,
    imagePost,
    imagePut,
    imageDelete
};