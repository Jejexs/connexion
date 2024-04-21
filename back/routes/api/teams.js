const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('memory-cache');
require('dotenv').config();

const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;
const CACHE_KEY = 'teamsData';
const CACHE_DURATION = 24 * 60 * 60 * 1000;  // 24 hours

router.get('/', async (req, res) => {
    try {
        let allTeams = cache.get(CACHE_KEY);
        if (!allTeams) {
            allTeams = [];
            let currentPage = 1;
            let totalPages = 1;
            do {
                const response = await axios.get('https://api.pandascore.co/teams', {
                    headers: {
                        Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                        Accept: 'application/json'
                    },
                    params: {
                        'filter[videogame_id]': req.query.videogame_id || 1,
                        'sort': req.query.sort || 'acronym',
                        'page': currentPage,
                        'per_page': 100  // Adjust based on API limits
                    }
                });

                allTeams = allTeams.concat(response.data);
                totalPages = Math.ceil(response.headers['x-total'] / 100);
                currentPage++;
            } while (currentPage <= totalPages);

            cache.put(CACHE_KEY, allTeams, CACHE_DURATION);
        }
        res.json(allTeams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
