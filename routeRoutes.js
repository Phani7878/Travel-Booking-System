// routes/routeRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all available routes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM routes");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching routes:", err);
    res.status(500).json({ message: "Failed to fetch routes" });
  }
});

// Get route by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM routes WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching route:", err);
    res.status(500).json({ message: "Failed to fetch route" });
  }
});


module.exports = router;
