const PriceList = require('../models/price-list');
const fs = require('fs');
const compress_images = require('compress-images');
let Product = require('../models/products');

function priceListGet(req, res) {
    if (!req.query.type) {
        return res.json({
            success: false
        });
    }
    PriceList.find({type: req.query.type}, ['model', 'image'], (err, data) => {
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

function priceListGetAll(req, res) {
    if (!req.query.type) {
        return res.json({
            success: false
        });
    }
    PriceList.find({type: req.query.type}, (err, data) => {
    // PriceList.find({}, (err, data) => {
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

function priceListGetById(req, res) {
    PriceList.findById(req.params.id, (err, data) => {
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

// let listItem = new PriceList();
// listItem.model = 'iphone 7';
// listItem.image = 'iphone7.png';
// listItem.listImage = 'iphone7list.png';
// listItem.topItems = [
//     {
//         title: 'Диагностика',
//         subTitle: 'чтобы сбить бабла',
//         price: '100'
//     }
// ];
// listItem.categories = [
//     {
//         name: 'Ремонт iPhone',
//         items: [
//             {
//                 title: 'Диагностика',
//                 subTitle: 'чтобы сбить бабла',
//                 price: '100'
//             },
//             {
//                 title: 'Диагностика',
//                 subTitle: 'чтобы сбить бабла',
//                 price: '100'
//             }
//         ]
//     }
// ];
// listItem.save();


function priceListPost(req, res) {
    console.log(req.body);
    let body = JSON.parse(req.body.priceList);
    console.log(body);
    console.log(req.files);

    if (!req.files.image || !req.files.listImage) {
        return res.json({
            success: false,
            err: 'no image'
        });
    }

    let priceList = new PriceList();
    priceList.type = body.type;
    priceList.model = body.model;
    priceList.topItems = body.topItems;
    priceList.categories = body.categories;
    priceList.image = req.files.image[0].filename;
    priceList.listImage = req.files.listImage[0].filename;
    priceList.save((err, data) => {
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

// function writeAllImages(files) {
//     return files.map((file) => {
//         return file.filename;
//     })
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
// }

function priceListPut(req, res) {
    PriceList.findById(req.params.id, (err, priceList) => {
        if (err || !priceList) {
            return res.json({
                succes: false
            });
        }

        let filesForDelete = [];
        let filesForDeleteIfErr = [];
        let body = JSON.parse(req.body.priceList);

        console.log(body);

        if (req.files.image) {
            filesForDelete.push(priceList.image);
            filesForDeleteIfErr.push(req.files.image[0].filename);
            priceList.image = req.files.image[0].filename;
        }
        if (req.files.listImage) {
            filesForDelete.push(priceList.listImage);
            filesForDeleteIfErr.push(req.files.listImage[0].filename);
            priceList.listImage = req.files.listImage[0].filename;
        }

        priceList.model = body.model;
        // priceList.type = body.type;
        priceList.topItems = body.topItems;
        priceList.categories = body.categories;

        priceList.save((err, data) => {
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
    priceListGet,
    priceListGetAll,
    priceListGetById,
    priceListPost,
    priceListPut,
    productDelete
};