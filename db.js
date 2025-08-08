// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Phani@8501020451',
  database: 'ticket_booking_system',
});

module.exports = pool.promise(); // if you're using async/await


connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

module.exports = connection;
