const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Default XAMPP MySQL user (adjust if changed)
    password: '', // Default XAMPP MySQL password (adjust if changed)
    database: 'bookstore' // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;