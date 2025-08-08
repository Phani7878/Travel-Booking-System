const express = require('express');
const { bookTicket } = require('../controllers/bookController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, bookTicket);

module.exports = router;
