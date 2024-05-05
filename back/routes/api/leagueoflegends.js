const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;

// Route pour récupérer les matchs à venir de League of Legends
router.get('/upcoming', async (req, res) => {
    try {
        const response = await axios.get('https://api.pandascore.co/lol/matches/upcoming', {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching upcoming League of Legends matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route pour récupérer les matchs passés de League of Legends
router.get('/past', async (req, res) => {
    try {
        const response = await axios.get('https://api.pandascore.co/lol/matches/past', {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching past League of Legends matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route pour récupérer tous les matchs de League of Legends
router.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://api.pandascore.co/lol/matches', {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching all League of Legends matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;