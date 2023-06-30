require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// db connection
const connectDB = require('./db/connect');

// routers
const shortLinkerRouter = require('./routers/shortLinkerRoute');

// error handlers
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express.json());

app.use('', shortLinkerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
