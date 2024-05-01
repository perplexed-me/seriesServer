// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = '175b6bae4e9c5185dcc3c05eb6f49419'; // Replace with your TMDB API key

app.use(express.static('public'));

// Route to fetch popular movies
app.get('/api/movies/popular', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to search for movies
app.get('/api/movies/search', async (req, res) => {
    const query = req.query.query;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=en-US`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
