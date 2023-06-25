const express = require('express');
const app = express();
const detectIP = require('./middleware/detectIP');

app.use(express.json());

app.get('/', detectIP, (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).json({ error: 'Something wrong with connection' });
  }
  const time = new Date().toLocaleTimeString('ua-UA', {
    hour12: false,
  });
  console.log(`${time}: ${user.country} - ${user.ipAddress}`);
  res.status(200).json(user);
});

const port = 8000;

try {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
} catch (error) {
  console.log(error);
}
