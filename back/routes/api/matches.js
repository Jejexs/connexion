const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
// Utilisez dotenv pour sécuriser votre token d'API
const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;

router.get('/upcoming', async (req, res) => {
    try {
        const response = await axios.get('https://api.pandascore.co/matches/upcoming', {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/past', async (req, res) => {
    try {
        const response = await axios.get('https://api.pandascore.co/matches/past', {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching past matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route pour récupérer tous les matchs
router.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://api.pandascore.co/matches', {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching all matches:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
