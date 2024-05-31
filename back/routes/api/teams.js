const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('memory-cache');
require('dotenv').config();

// Récupération du token Bearer pour l'API PandaScore à partir des variables d'environnement
const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;
const CACHE_KEY = 'teamsData'; // Clé de cache pour stocker les données des équipes
const CACHE_DURATION = 24 * 60 * 60 * 1000;  // Durée de cache: 24 heures

// Route GET pour récupérer les équipes
router.get('/', async (req, res) => {
    try {
        // Vérifie si les données des équipes sont en cache
        let allTeams = cache.get(CACHE_KEY);
        if (!allTeams) {
            allTeams = [];
            let currentPage = 1;
            let totalPages = 1;
            do {
                // Requête à l'API PandaScore pour récupérer les équipes
                const response = await axios.get('https://api.pandascore.co/teams', {
                    headers: {
                        Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                        Accept: 'application/json'
                    },
                    params: {
                        'filter[videogame_id]': req.query.videogame_id || 1, // Filtrer par ID de jeu vidéo, par défaut 1
                        'sort': req.query.sort || 'acronym', // Trier par acronyme par défaut
                        'page': currentPage, // Pagination
                        'per_page': 100  // Nombre d'éléments par page (ajuster selon les limites de l'API)
                    }
                });

                // Concatène les données récupérées avec les données existantes
                allTeams = allTeams.concat(response.data);
                // Calcule le nombre total de pages
                totalPages = Math.ceil(response.headers['x-total'] / 100);
                currentPage++;
            } while (currentPage <= totalPages);

            // Met en cache les données des équipes pour la durée spécifiée
            cache.put(CACHE_KEY, allTeams, CACHE_DURATION);
        }
        // Retourne les données des équipes en JSON
        res.json(allTeams);
    } catch (error) {
        // En cas d'erreur, log l'erreur et retourne une erreur serveur
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
