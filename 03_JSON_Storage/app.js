require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// postgres connect check
const { dbConnectionCheck } = require('./db/connect');
// routers
const urlRouter = require('./routes/urlRouter');

// error handlers
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to JSON Pile</h1>');
});

app.use('', urlRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server
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
