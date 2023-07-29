const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const listProducts = asyncHandler(async (req, res) => {
  let limit = 20;
  let offset = 0;
  const query = {};
  if (req.query.limit) {
    limit = req.query.limit;
  }

  if (req.query.offset) {
    offset = req.query.offset;
  }

  if (req.query.companies) {
    const comQuery = req.query.companies.includes(',') ? { company: { $in: req.query.companies.split(',') } } : { company: req.query.companies }
    const products = await Product.find(comQuery).exec();
    if (products) {
      query.company = comQuery.company;
    }
  }

  if (req.query.colors) {
    const comQuery = req.query.colors.includes(',') ? { color: { $in: req.query.colors.split(',') } } : { color: req.query.colors }
    const products = await Product.find(comQuery).exec();
    if (products) {
      query.color = comQuery.color;
    }
  }

  const filteredProducts = await Product.find(query)
    .limit(Number(limit))
    .skip(Number(offset))
    .sort({ createdAt: 'desc' })
    .exec();

  const productsCount = await Product.count(query);

  return res.status(200).json({
    products: filteredProducts,
    productsCount,
  });
});

const listFilters = asyncHandler(async (req, res) => {
  const companies = {};
  const colors = {};
  const products = await Product.find({}).exec();
  if (products.length) {
    products.forEach((product) => {
      if (companies[product.company]) {
        companies[product.company] += 1;
      } else {
        companies[product.company] = 1;
      }
      if (colors[product.color]) {
        colors[product.color] += 1;
      } else {
        colors[product.color] = 1;
      }
    });
  }
  return res.status(200).json({
    companies,
    colors,
  });
});

module.exports = {
  listProducts,
  listFilters,
};
