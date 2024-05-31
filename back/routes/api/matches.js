const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;

const GAMES = {
    'league-of-legends': 'lol',
    'cs-2': 'csgo',
    'dota-2': 'dota2'
};

router.get('/:game/:type', async (req, res) => {
    const { game, type } = req.params;
    const limit = req.query.limit || 5; // You can pass a limit parameter to control the number of returned matches
    const date = req.query.date; // Optional date filter

    const apiGame = GAMES[game];
    if (!apiGame) {
        return res.status(400).json({ message: 'Invalid game specified' });
    }

    const endpoint = type === 'past' ? 'matches/past' : 'matches/upcoming';
    let url = `https://api.pandascore.co/${apiGame}/${endpoint}?page[size]=${limit}`;
    if (date) {
        url += `&range[begin_at]=${date}T00:00:00Z,${date}T23:59:59Z`;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching ${type} matches for ${game}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
