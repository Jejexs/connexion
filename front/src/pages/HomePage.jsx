import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchDisplay from '../components/MatchDisplay';
function HomePage() {
    const [matches, setMatches] = useState({
        lolUpcoming: [],
        csgoUpcoming: [],
        dotaUpcoming: [],
    });

    useEffect(() => {
        const games = ['lol', 'csgo', 'dota2'];
        const fetchMatches = (game) => {
            return axios.get(`http://localhost:3000/api/matches/${game}/upcoming?limit=2`)
                .then(response => ({ game, data: response.data }))
                .catch(error => console.error(`Erreur lors de la récupération des matchs à venir pour ${game}:`, error));
        };

        const requests = games.map(game => fetchMatches(game));
        
        Promise.all(requests).then(results => {
            const newMatches = {};
            results.forEach(({ game, data }) => {
                newMatches[`${game}Upcoming`] = data;
            });
            setMatches(newMatches);
        });
    }, []);

    const gameTitles = {
        lolUpcoming: "League of Legends",
        csgoUpcoming: "Counter Strike",
        dotaUpcoming: "Dota 2"
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-white">
            {Object.entries(matches).map(([key, matchList]) => (
                <div key={key} className="mb-8">
                    <h2 className="text-xl font-semibold mb-1">{gameTitles[key]}</h2>
                    <hr className="border-white mb-4" />
                    <div className="space-y-4">
                        {matchList.map(match => (
                            <div key={match.id} className="p-3">
                                <p className="text-sm">{formatDate(match.begin_at)}</p>
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
