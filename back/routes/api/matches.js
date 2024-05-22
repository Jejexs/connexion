const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;

// Route générique pour récupérer les matchs de différents jeux et différents types
router.get('/:game/:matchType', async (req, res) => {
    const { game, matchType } = req.params;
    const limit = req.query.limit || 5;  // Vous pouvez passer un paramètre de limite pour contrôler le nombre de matchs retournés

    const url = `https://api.pandascore.co/${game}/matches/${matchType}?page[size]=${limit}`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching ${matchType} matches for ${game}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
