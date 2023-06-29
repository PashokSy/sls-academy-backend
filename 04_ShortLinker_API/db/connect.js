const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connection to DB established');
};

module.exports = connectDB;
