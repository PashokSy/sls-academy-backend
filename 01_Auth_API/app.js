require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// postgres connect
const dbCheck = require('./db/connect');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>01_Auth_API</h1>');
});

// server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbCheck();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
