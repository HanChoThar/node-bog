const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BlogRoutes = require('./routes/BlogRoutes');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
mongoose.connect(uri, { dbName })
    .then(() => {
        console.log('Connected to MongoDB');
        startServer();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Express app
const app = express();

// Set the template view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use(BlogRoutes);

// 404 Middleware
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not Found' });
});

// Start the server
function startServer() {
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
