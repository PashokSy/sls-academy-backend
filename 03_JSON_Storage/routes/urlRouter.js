const express = require('express');
const router = express.Router();

const { putJson } = require('../controllers/urlController');

router.route('/:pileName/:jsonName').put(putJson);

module.exports = router;
