const mongoose = require('mongoose');
const addTestData = require('./addFakeData');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    addTestData();
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
