const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/authMiddleware');

// POST: Book a ticket
router.post('/book', verifyToken, (req, res) => {
  const { route_id } = req.body;
  const user_id = req.user.id;

  db.query(
    'INSERT INTO bookings (user_id, route_id) VALUES (?, ?)',
    [user_id, route_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Booking failed' });

      res.status(201).json({ message: 'Ticket booked successfully' });
    }
  );
});


// GET: View user’s bookings
router.get('/my-bookings', verifyToken, (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT b.id AS booking_id, r.source, r.destination, r.departure_time, r.price, b.booking_time
    FROM bookings b
    JOIN routes r ON b.route_id = r.id
    WHERE b.user_id = ?
    ORDER BY b.booking_time DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch bookings' });

    res.json(results);
    console.log("Received booking request:", req.body);

  });
});

module.exports = router;
