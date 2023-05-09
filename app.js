const express = require('express');
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '3306',
  user: 'root',
  password: '',
  database: 'users'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

// Create the Express app
const app = express();

// Define the API endpoint
app.get('/users', (req, res) => {
  // Retrieve all users from the database
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error retrieving users data: ', error);
      res.status(500).send('Error retrieving users data');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
