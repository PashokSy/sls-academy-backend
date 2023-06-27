require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
// routers
const urlRouter = require('./routes/urlRouter');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to JSON Pile</h1>');
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
