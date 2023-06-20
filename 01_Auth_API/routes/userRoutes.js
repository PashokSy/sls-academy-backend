const express = require('express');
const router = express.Router();

const { getCurrentUser } = require('../controllers/userController');

router.route('/me').get(getCurrentUser);

module.exports = router;
