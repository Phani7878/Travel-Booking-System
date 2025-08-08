const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all routes (tickets)
router.get('/routes', (req, res) => {
  db.query('SELECT * FROM routes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching routes' });
    }
    res.json(results);
  });
});

// GET single route by ID
router.get('/routes/:id', (req, res) => {
  const routeId = req.params.id;
  db.query('SELECT * FROM routes WHERE id = ?', [routeId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching route' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.json(results[0]);
  });
});

module.exports = router;
