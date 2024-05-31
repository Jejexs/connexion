const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const PANDASCORE_BEARER_TOKEN = process.env.PANDASCORE_TOKEN;

// Dictionnaire pour mapper les jeux à leurs identifiants dans l'API PandaScore
const GAMES = {
    'league-of-legends': 'lol',
    'cs-2': 'csgo',
    'dota-2': 'dota2'
};

// Route GET pour récupérer les matchs (passés ou à venir) pour un jeu spécifique
router.get('/:game/:type', async (req, res) => {
    const { game, type } = req.params; // Récupère les paramètres de jeu et de type de match (passé ou à venir)
    const limit = req.query.limit || 5; // Limite par défaut des matchs retournés
    const date = req.query.date; // Filtre optionnel par date

    // Vérifie si le jeu spécifié est valide
    const apiGame = GAMES[game];
    if (!apiGame) {
        return res.status(400).json({ message: 'Invalid game specified' });
    }

    // Détermine l'endpoint à utiliser (matchs passés ou à venir)
    const endpoint = type === 'past' ? 'matches/past' : 'matches/upcoming';
    let url = `https://api.pandascore.co/${apiGame}/${endpoint}?page[size]=${limit}`;
    
    // Ajoute le filtre de date si spécifié
    if (date) {
        url += `&range[begin_at]=${date}T00:00:00Z,${date}T23:59:59Z`;
    }

    try {
        // Requête à l'API PandaScore pour récupérer les matchs
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${PANDASCORE_BEARER_TOKEN}`,
                Accept: 'application/json'
            }
        });
        // Retourne les données des matchs en JSON
        res.json(response.data);
    } catch (error) {
        // En cas d'erreur, log l'erreur et retourne une erreur serveur
        console.error(`Error fetching ${type} matches for ${game}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
