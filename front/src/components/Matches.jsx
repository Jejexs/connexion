import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Matches() {
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [pastMatches, setPastMatches] = useState([]);

    useEffect(() => {
        // Appel pour les matchs à venir via votre backend
        axios.get('http://localhost:3000/api/matches/upcoming')
            .then(response => {
                setUpcomingMatches(response.data.slice(0, 5));
            })
            .catch(error => console.error('Erreur lors de la récupération des matchs à venir:', error));

        // Appel pour les matchs passés via votre backend
        axios.get('http://localhost:3000/api/matches/past')
            .then(response => {
                setPastMatches(response.data.slice(0, 5));
            })
            .catch(error => console.error('Erreur lors de la récupération des matchs passés:', error));
    }, []);

    const getTeamStyle = (teamId, match) => {
        if (match.winner_id === teamId) return 'text-green-600';
        if (match.winner_id && match.winner_id !== teamId) return 'text-red-600';
        return '';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (date.getTime() === new Date(0).getTime()) {
            return "Heure non disponible";
        }
        return date.toLocaleString();
    };

    // Fonction pour afficher l'image ou un substitut si l'image est absente
    const displayImageOrPlaceholder = (image_url, teamName) => {
        if (image_url) {
            return <img src={image_url} alt={teamName} className="w-6 h-6" />;
        } else {
            // Retourner un substitut, comme une div avec le texte ou une forme simple
            return <div className="w-6 h-6 bg-gray-300 flex items-center justify-center text-xs text-white">{teamName[0]}</div>;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-blue-600 mb-4">Matchs à venir</h2>
                    <div className="space-y-2">
                        {upcomingMatches.map(match => (
                            <div key={match.id} className="bg-blue-100 rounded-md p-3 shadow">
                                <p className="text-sm text-gray-600">{formatDate(match.begin_at)} - {match.videogame.name}</p>
                                <div className="flex items-center justify-center space-x-4 mt-2">
                                    {match.opponents.map((opponent, index) => (
                                        <React.Fragment key={index}>
                                            {index === 0 && (
                                                <>
                                                    {displayImageOrPlaceholder(opponent.opponent.image_url, opponent.opponent.name)}
                                                    <span className="mx-2">{opponent.opponent.name}</span>
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <span>VS</span>
                                    {match.opponents.slice(-1).map((opponent, index) => (
                                        <React.Fragment key={index}>
                                            <span className="mx-2">{opponent.opponent.name}</span>
                                            {displayImageOrPlaceholder(opponent.opponent.image_url, opponent.opponent.name)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Matchs passés</h2>
                    <div className="space-y-2">
                        {pastMatches.map(match => (
                            <div key={match.id} className="bg-red-100 rounded-md p-3 shadow">
                                <p className="text-sm text-gray-600">{formatDate(match.begin_at)} - {match.videogame.name}</p>
                                <div className="flex items-center justify-center space-x-4 mt-2">
                                    {match.opponents.map((opponent, index) => (
                                        <React.Fragment key={index}>
                                            {index === 0 && (
                                                <>
                                                    {displayImageOrPlaceholder(opponent.opponent.image_url, opponent.opponent.name)}
                                                    <span className="mx-2">{opponent.opponent.name}</span>
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <span className="font-bold">VS</span>
                                    {match.opponents.slice(-1).map((opponent, index) => (
                                        <React.Fragment key={index}>
                                            <span className="mx-2">{opponent.opponent.name}</span>
                                            {displayImageOrPlaceholder(opponent.opponent.image_url, opponent.opponent.name)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Matches;
