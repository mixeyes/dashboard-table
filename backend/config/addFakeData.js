const Product = require('../models/Product');
const testData = require('./products.json');

const addTestData = async () => {
  const existingData = await Product.find({}).exec();
  if (existingData.length) {
    return;
  }
  Product.insertMany(testData)
    .then(() => {
      console.log('Data inserted'); // Success
    })
    .catch((error) => {
      console.log(error); // Failure
    });
};
module.exports = addTestData;
