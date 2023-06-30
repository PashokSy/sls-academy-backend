const express = require('express');
const router = express.Router();

const {
  postLongLink,
  getUrl,
} = require('../controllers/shortLinkerController');

router.route('/').post(postLongLink);
router.route('/:shortUrl').get(getUrl);

module.exports = router;
