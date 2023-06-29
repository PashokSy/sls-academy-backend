require('dotenv').config();
const express = require('express');
const app = express();

// db connection
const connectDB = require('./db/connect');

// middleware
app.use(express.json());

// server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
