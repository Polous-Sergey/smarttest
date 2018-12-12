const Category = require('../models/category');


function categoryGet(req, res) {
    Category.find({}, (err, data) => {
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

function categoryPost(req, res) {
    let category = new Category();
    category.name = req.body.name;
    category.save((err, data) => {
        if(err) {
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

function categoryPut(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

function categoryDelete(req, res) {
    res.status(200);
    res.json({
        "succes": true
    });
}

module.exports = {
    categoryGet,
    categoryPost,
    categoryPut,
    categoryDelete
};