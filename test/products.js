const Image = require('../models/image');
const fs = require('fs');
const compress_images = require('compress-images');

const Product = require('../models/products');

function productGet(req, res) {
    Product.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err: err
            });
        }

        res.json({
            success: true,
            data: data
        });
    });
}

async function productPost(req, res) {
    let body = JSON.parse(req.body.product);
    // let imageId = await writeAllImages(req.files.images ? req.files.images : []).catch((err) => {
    //     return res.json({
    //         success: false,
    //         err: err
    //     });
    // });
    // let coverId = await writeAllImages(req.files.cover ? req.files.cover : []).catch((err) => {
    //     return res.json({
    //         success: false,
    //         err: err
    //     });
    // });

    let imageId = await writeAllImages(req.files.images ? req.files.images : []);
    let coverId = await writeAllImages(req.files.cover ? req.files.cover : []);

    let product = new Product();
    product.title = body.title;
    product.price = body.price;
    product.description = body.description;
    product.shortDescription = body.shortDescription;
    // product.category = body.categoryId;
    product.totalRating = body.totalRating;
    product.images = imageId;
    product.cover = coverId[0];
    product.save((err, data) => {
        if (err) {
            return res.json({
                success: false,
                err: err
            });
        }
        return res.json({
            success: true,
            data: data
        });
    });
}

function writeAllImages(files) {
    return files.map((file) => {
        return file.filename;
    })
//     return Promise.all(files.map((file) => {
//         return new Promise((resolve, reject) => {
//             compress_images(file.path, 'uploads/', {
//                     compress_force: false,
//                     statistic: true,
//                     autoupdate: false
//                 }, false,
//                 {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
//                 {png: {engine: 'pngquant', command: false}},
//                 {svg: {engine: 'svgo', command: false}},
//                 {gif: {engine: 'gifsicle', command: false}}, function (err) {
//                     if (err) reject(err);
//                     let image = new Image();
//                     image.img = fs.readFileSync('upload/' + file.filename);
//                     image.save((err, data) => {
//                         fs.unlink(file.path, unlinkCB);
//                         fs.unlink('upload/' + file.filename, unlinkCB);
//                         if (err) {
//                             return reject(err);
//                         }
//                         resolve(data._id);
//                     });
//
//                 });
//         })
//     }))
}

function productPut(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err || !product) {
            return res.json({
                succes: false,
            });
        }

        let filesForDelete = [];
        let filesForDeleteIfErr = [];
        let body = JSON.parse(req.body.product);
        if (req.body.imagesForDelete) {
            let imagesForDelete = JSON.parse(req.body.imagesForDelete);
            imagesForDelete.forEach((image) => {
                let index = product.images.indexOf(image);
                if (index === -1) {
                    return;
                }
                filesForDelete.push(product.images[index]);
                product.images.splice(index, 1);
            })
        }

        if (req.files.cover) {
            filesForDelete.push(product.cover);
            filesForDeleteIfErr.push(req.files.cover[0].filename);
            product.cover = req.files.cover[0].filename;
        }
        if (req.files.images) {
            product.images = [...product.images, ...writeAllImages(req.files.images)];
            filesForDeleteIfErr = [...filesForDeleteIfErr, ...writeAllImages(req.files.images)];
        }

        product.title = body.title;
        product.price = body.price;
        product.description = body.description;
        product.shortDescription = body.shortDescription;
        // product.category = body.categoryId;
        product.totalRating = body.totalRating;
        product.save((err, data) => {
            if (err) {
                deleteFiles(filesForDeleteIfErr);
                return res.json({
                    success: false,
                    err: err
                });
            }
            if (filesForDelete.length > 0) {
                deleteFiles(filesForDelete);
            }

            return res.json({
                success: true,
                data: data
            });
        });
    });
}

function deleteFiles(fileNames) {
    return Promise.all(fileNames.map((file) => {
        return new Promise((resolve, reject) => {
            fs.unlink('uploads/' + file, function (err) {
                if (err) {
                    console.log('cant delete file', err);
                    return reject(err)
                }
                return resolve()
            });
        })
    }))
}

function productDelete(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err || !product) {
            return res.json({
                succes: false,
            });
        }
        res.send(product);
    });
}

module.exports = {
    productGet,
    productPost,
    productPut,
    productDelete
};