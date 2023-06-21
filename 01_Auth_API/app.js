require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// postgres connect check
const { dbConnectionCheck } = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// error handlers
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>01_Auth_API</h1>');
});
app.use('/auth', authRouter);
app.use('', userRouter);

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
