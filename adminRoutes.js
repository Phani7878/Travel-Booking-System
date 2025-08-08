const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET All Bookings with stats
router.get('/bookings', async (req, res) => {
  try {
    const [bookings] = await pool.query(`
      SELECT b.id, u.name AS user_name, u.email AS user_email, b.ticket_name, b.price, b.booking_date
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      ORDER BY b.booking_date DESC
    `);

    const totalRevenue = bookings.reduce((acc, b) => acc + b.price, 0);

    res.json({
      totalBookings: bookings.length,
      totalRevenue,
      bookings,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin dashboard data' });
  }
});

// DELETE booking
router.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
});

module.exports = router;
