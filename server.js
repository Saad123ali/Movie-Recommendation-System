// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set up port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (like CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine and views directory path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const movieRoutes = require('./routes/movieRoutes'); // Add more routes as needed

// Use imported routes
app.use('/admin', adminRoutes);
app.use('/movies', movieRoutes); // Example additional route for movies

// Route for the index page
app.get('/', (req, res) => {
    res.render('index'); // Render your index.ejs page
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
