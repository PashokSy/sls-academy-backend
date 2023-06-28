const express = require('express');
const router = express.Router();

const { putJson, getJson } = require('../controllers/urlController');

router.route('/:pileName/:jsonName').put(putJson).get(getJson);

module.exports = router;
