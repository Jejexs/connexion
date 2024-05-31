import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchDisplay from '../components/MatchDisplay';

const Calendar = () => {
    const [matches, setMatches] = useState([]);
    const [selectedGame, setSelectedGame] = useState('league-of-legends');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchMatches(selectedGame, selectedDate);
    }, [selectedGame, selectedDate]);

    const fetchMatches = async (game, date) => {
        try {
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0)); // Check if the selected date is in the past
            const apiEndpoint = isPast ? 'past' : 'upcoming';
            const formattedDate = date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
            const response = await axios.get(`http://localhost:3000/api/matches/${game}/${apiEndpoint}`, {
                params: {
                    date: formattedDate,
                    limit: 20
                }
            });
            setMatches(response.data);
        } catch (error) {
            console.error(`Error fetching matches for ${game}:`, error);
        }
    };

    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
    };

    const handleDateChange = (days) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-white">
            <div className="mb-4">
                <label htmlFor="game-select" className="block text-sm font-medium text-gray-300">Sélectionnez un jeu :</label>
                <div className="relative inline-block w-full sm:w-auto">
                    <select
                        id="game-select"
                        value={selectedGame}
                        onChange={handleGameChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white bg-opacity-20 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'%23333333\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M10 6a.75.75 0 01.53.22l4.25 4a.75.75 0 01-1.06 1.06L10 7.81 6.28 11.28a.75.75 0 01-1.06-1.06l4.25-4A.75.75 0 0110 6z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
                    >
                        <option value="league-of-legends">League of Legends</option>
                        <option value="cs-2">Counter-Strike 2</option>
                        <option value="dota-2">Dota 2</option>
                    </select>
                </div>
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
                        <div key={match.id} className="mb-4">
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
