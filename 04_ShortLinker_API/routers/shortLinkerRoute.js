const express = require('express');
const router = express.Router();

const { postLongLink } = require('../controllers/shortLinkerController');

router.route('/').post(postLongLink);

module.exports = router;
