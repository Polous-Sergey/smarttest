const Order = require('../models/order');


async function orderGet(req, res) {
    Order.find({}).populate('products').exec((err, product) => {
        if (err) {
            res.json({
                success: false,
                message: 'Product is not found',
                err: err
            });
        } else {
            res.json({
                success: true,
                data: product
            });
        }
    });
}

function orderPost(req, res) {
    let order = new Order();
    order.name = req.body.name;
    order.number = req.body.number;
    order.products = req.body.products.map(product => product._id);
    order.save((err, data) => {
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

function orderPut(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

function orderDelete(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

module.exports = {
    orderGet,
    orderPost,
    orderPut,
    orderDelete
};