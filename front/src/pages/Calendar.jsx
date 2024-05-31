import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import MatchDisplay from '../components/MatchDisplay';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
    // État pour stocker les matchs récupérés depuis l'API
    const [matches, setMatches] = useState([]);
    // État pour stocker le jeu sélectionné par l'utilisateur
    const [selectedGame, setSelectedGame] = useState({ value: 'league-of-legends', label: 'League of Legends' });
    // État pour stocker la date sélectionnée par l'utilisateur
    const [selectedDate, setSelectedDate] = useState(new Date());
    // Hook de navigation pour rediriger l'utilisateur si nécessaire
    const navigate = useNavigate();

    // Vérifier l'authentification de l'utilisateur lors du chargement du composant
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Aucun token trouvé, redirection vers la page de connexion.");
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    // Appeler fetchMatches chaque fois que selectedGame ou selectedDate change
    useEffect(() => {
        fetchMatches(selectedGame.value, selectedDate);
    }, [selectedGame, selectedDate]);

    // Fonction pour récupérer les matchs depuis l'API en fonction du jeu et de la date sélectionnés
    const fetchMatches = async (game, date) => {
        try {
            // Vérifier si la date sélectionnée est dans le passé
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
            const apiEndpoint = isPast ? 'past' : 'upcoming';
            const formattedDate = date.toISOString().split('T')[0]; // Formatage de la date en YYYY-MM-DD
            const response = await axios.get(`http://localhost:3000/api/matches/${game}/${apiEndpoint}`, {
                params: {
                    date: formattedDate,
                    limit: 100
                }
            });
            setMatches(response.data);
        } catch (error) {
            console.error(`Error fetching matches for ${game}:`, error);
        }
    };

    // Jours de la semaine pour l'affichage
    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    // Fonction pour formater la date en jour et mois
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    // Gestionnaire de changement de jeu sélectionné
    const handleGameChange = (selectedOption) => {
        setSelectedGame(selectedOption);
    };

    // Gestionnaire de changement de date sélectionnée
    const handleDateChange = (days) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    // Styles personnalisés pour le composant Select de react-select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'transparent'
            },
            borderRadius: '10px',
            padding: '0.5rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1F2937', // Fond sombre pour une meilleure lisibilité
            borderRadius: '0 0 10px 10px', // Coins inférieurs légèrement arrondis
            marginTop: '0',
            padding: '0.5rem',
            transition: 'opacity 0.2s ease-in-out'
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '0'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#FFFFFF',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#D1D5DB',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#D1D5DB',
            '&:hover': {
                color: '#D1D5DB',
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3B82F6' : 'transparent', // Fond bleu quand sélectionné
            color: state.isSelected ? '#FFFFFF' : '#D1D5DB', // Texte blanc quand sélectionné
            '&:hover': {
                backgroundColor: '#3B82F6', // Fond bleu au survol
                color: '#FFFFFF' // Texte blanc au survol
            },
            padding: '0.5rem 1rem',
            borderRadius: '0' // Pas de coins arrondis pour les options
        }),
    };

    // Options de jeu pour le composant Select
    const gameOptions = [
        { value: 'league-of-legends', label: 'League of Legends' },
        { value: 'cs-2', label: 'Counter-Strike 2' },
        { value: 'dota-2', label: 'Dota 2' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-white">
            <div className="mb-4">
                <label htmlFor="game-select" className="block text-sm font-medium text-gray-300">Sélectionnez un jeu :</label>
                <Select
                    id="game-select"
                    value={selectedGame}
                    onChange={handleGameChange}
                    options={gameOptions}
                    styles={customStyles}
                    className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    isSearchable={false}
                />
            </div>
            <div className="flex justify-between mb-8">
                {[...Array(6).keys()].map(i => (
                    <button
                        key={i}
                        onClick={() => handleDateChange(i - 2)}
                        className={`p-2 rounded ${selectedDate.toDateString() === new Date(new Date().setDate(new Date().getDate() + i - 2)).toDateString() ? 'bg-white text-black' : 'bg-gray-700 bg-opacity-50 text-white'}`}
                    >
                        <div>{daysOfWeek[(new Date().getDay() + i - 2 + 7) % 7]}.</div>
                        <div>{formatDate(new Date(new Date().setDate(new Date().getDate() + i - 2)))}</div>
                    </button>
                ))}
            </div>
            <div className="space-y-4">
                {matches.length > 0 ? (
                    matches.map(match => (
                        <div key={match.id} className="mb-4 py-2">
                            <MatchDisplay match={match} isPast={selectedDate < new Date(new Date().setHours(0, 0, 0, 0))} />
                        </div>
                    ))
                ) : (
                    <div>Aucun match à afficher</div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
