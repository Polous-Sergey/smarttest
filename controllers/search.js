const PriceList = require('../models/price-list');
const Product = require('../models/products');
const types = ['iPhone', 'iPad', 'MacBook', 'Apple Watch'];

async function searchGet(req, res) {
  let filterValue = req.query.filterValue.trim().toLowerCase();
  filterValue = filterValue.split(' ');
  let priceList = await PriceList.find({}, ['model', 'topItems', 'categories']);
  let products = await Product.find({}, ['title']);
  let searchRes = {
    type: [],
    model: [],
    category: [],
    item: [],
    products: []
  };

  types.forEach(item => {
    let isContain = filterValue.every(filterValueItem => {
      return item.toLowerCase().includes(filterValueItem)
    });
    if (isContain) searchRes.type.push(item);
  });

  priceList.forEach(priceListItem => {
    let isContain = filterValue.every(filterValueItem => {
      return priceListItem.model.toLowerCase().includes(filterValueItem)
    });
    if (isContain) searchRes.model.push(priceListItem.model);

    priceListItem.categories.forEach(category => {
      let isContain = filterValue.every(filterValueItem => {
        return category.name.toLowerCase().includes(filterValueItem)
      });
      if (isContain) searchRes.category.push(category.name);

      category.items.forEach(item => {
        let isContain = filterValue.every(filterValueItem => {
          return item.title.toLowerCase().includes(filterValueItem)
        });
        if (isContain) searchRes.item.push(item.title)
      })
    });

    priceListItem.topItems.forEach(item => {
      let isContain = filterValue.every(filterValueItem => {
        return item.title.toLowerCase().includes(filterValueItem)
      });
      if (isContain) searchRes.item.push(item.title);
    })
  });

  products.forEach(product => {
    let isContain = filterValue.every(filterValueItem => {
      return product.title.toLowerCase().includes(filterValueItem)
    });
    if (isContain) searchRes.products.push(product.title);
  });

  res.json({
    success: true,
    data: searchRes
  });
}

module.exports = {
  searchGet,
};
