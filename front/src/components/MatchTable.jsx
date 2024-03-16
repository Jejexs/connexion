import React, { useState, useEffect } from 'react';

// Import des logos des jeux
import dotaLogo from '../assets/dota_logo.png';
import csLogo from '../assets/cs_logo.svg';
import lolLogo from '../assets/lol_logo.png';

const MatchTable = ({ matches }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [matchesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [uniqueGames, setUniqueGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');

    // useEffect pour trier les jeux uniques
    useEffect(() => {
        // Récupérer les jeux uniques à partir des données de match
        const games = matches.map(match => match.videogame.name);
        const uniqueGames = Array.from(new Set(games));

        // Ordre des jeux spécifié
        const orderedGames = [
            { name: 'Dota 2', logo: dotaLogo },
            { name: 'Counter-Strike', logo: csLogo },
            { name: 'LoL', logo: lolLogo }
        ];

        // Trier les jeux uniques dans l'ordre spécifié
        const sortedUniqueGames = orderedGames.filter(game => uniqueGames.includes(game.name));

        setUniqueGames(sortedUniqueGames);
    }, [matches]);

    // Fonction pour gérer le changement de page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Fonction pour filtrer les matchs par jeu sélectionné
    const filterMatchesByGame = game => {
        setSelectedGame(game.toLowerCase());
    };

    // Fonction pour filtrer les matchs en fonction de la recherche par jeu
    const filteredMatches = searchTerm
        ? matches.filter(
            match =>
                match.videogame.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                match.date.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : matches;

    // Fonction pour filtrer les matchs par jeu sélectionné
    const matchesBySelectedGame = selectedGame
        ? filteredMatches.filter(match => match.videogame.name.toLowerCase() === selectedGame)
        : filteredMatches;

    // Calcul des index des matchs à afficher sur la page actuelle
    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = matchesBySelectedGame.slice(indexOfFirstMatch, indexOfLastMatch);

    return (
        <div className="container mx-auto p-4">
            {/* Boutons pour filtrer par jeu */}
            <div className="flex space-x-4 mb-4">
                {uniqueGames.map((game, index) => (
                    <button
                        key={index}
                        onClick={() => filterMatchesByGame(game.name)}
                        className="flex items-center bg-gray-200 rounded p-2 hover:bg-gray-300"
                    >
                        <img src={game.logo} alt={game.name} className="w-auto h-12 max-h-12 mr-2" />
                    </button>
                ))}
            </div>
            {/* Barre de recherche par jeu */}
            <input
                type="text"
                placeholder="Rechercher par jeu..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md mb-4"
            />
            {/* Tableau des matchs */}
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Match</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Jeu</th>
                        <th className="border px-4 py-2">Ligue</th>
                        <th className="border px-4 py-2">Tournoi</th>
                        {/* Autres colonnes si nécessaire */}
                    </tr>
                </thead>
                <tbody>
                    {currentMatches.map(match => (
                        <tr key={match.id}>
                            <td className="border px-4 py-2">{match.name}</td>
                            <td className="border px-4 py-2">{match.scheduled_at}</td>
                            <td className="border px-4 py-2">{match.videogame.name}</td>
                            <td className="border px-4 py-2">{match.league.name}</td>
                            <td className="border px-4 py-2">{match.tournament.name}</td>
                            {/* Autres colonnes si nécessaire */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <ul className="flex justify-center mt-4">
                {filteredMatches.length > matchesPerPage &&
                    Array.from({ length: Math.ceil(filteredMatches.length / matchesPerPage) }).map((_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => paginate(index + 1)}
                                className="px-4 py-2 rounded-md border hover:bg-gray-200"
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MatchTable;
