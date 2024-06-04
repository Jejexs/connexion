import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchDisplay from '../components/MatchDisplay';

function HomePage() {
    // État pour stocker les matchs à venir pour différents jeux
    const [matches, setMatches] = useState({
        'league-of-legends': [],
        'cs-2': [],
        'dota-2': [],
    });

    // Utilisation de useEffect pour récupérer les matchs à venir lors du chargement du composant
    useEffect(() => {
        // Liste des jeux pour lesquels nous voulons récupérer les matchs
        const games = ['league-of-legends', 'cs-2', 'dota-2'];

        // Vérifiez si la variable d'environnement est bien définie
        console.log('Base URL:', import.meta.env.VITE_BASE_URL);

        // Fonction pour récupérer les matchs à venir pour un jeu spécifique
        const fetchMatches = (game) => {
            return axios.get(`${import.meta.env.VITE_BASE_URL}/api/matches/${game}/upcoming?limit=2`)
                .then(response => ({ game, data: response.data }))
                .catch(error => console.error(`Erreur lors de la récupération des matchs à venir pour ${game}:`, error));
        };

        // Création d'un tableau de promesses pour récupérer les matchs pour tous les jeux
        const requests = games.map(game => fetchMatches(game));

        // Attente de toutes les requêtes et mise à jour de l'état avec les données récupérées
        Promise.all(requests).then(results => {
            const newMatches = {};
            results.forEach(({ game, data }) => {
                newMatches[game] = data;
            });
            setMatches(newMatches);
        });
    }, []);

    // Titres des jeux à afficher
    const gameTitles = {
        'league-of-legends': "League of Legends",
        'cs-2': "Counter Strike 2",
        'dota-2': "Dota 2"
    };

    // Fonction pour formater la date en chaîne lisible
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-white">
            {/* Parcourir les matchs pour chaque jeu et les afficher */}
            {Object.entries(matches).map(([key, matchList]) => (
                <div key={key} className="mb-8">
                    <h2 className="text-2xl font-medium mb-1">{gameTitles[key]}</h2>
                    <hr className="border-white mb-4" />
                    <div className="space-y-4">
                        {/* Afficher chaque match pour le jeu courant */}
                        {matchList.map(match => (
                            <div key={match.id} className="p-3">
                                <p className="text-sm py-2">{formatDate(match.begin_at)}</p>
                                <MatchDisplay match={match} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
