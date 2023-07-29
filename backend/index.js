require('dotenv').config();
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnect');

const PORT = process.env.PORT || 4000;

const app = express();

console.log(process.env.NODE_ENV);
connectDB();

app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse json
app.use(cookieParser());

// products routes
app.use('/api/products', require('./routes/productsRoutes'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = app;
