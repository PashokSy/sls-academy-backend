require('dotenv').config();
const express = require('express');
const app = express();

// postgres connect check
const { dbConnectionCheck } = require('./db/connect');
// routers
const urlRouter = require('./routes/urlRouter');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to JSON Pile</h1>');
});

app.use('', urlRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnectionCheck();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
