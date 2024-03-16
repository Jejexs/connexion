import React, { useState, useEffect } from 'react';
import MatchTable from '../components/MatchTable';
import { useNavigate } from 'react-router-dom';


const AllMatches = () => {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Supposons que vous ayez une route d'API pour récupérer tous les matchs
        fetch('http://localhost:3000/api/matches/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(err => console.log(err));
    }, [navigate]);

    if (matches.length === 0) {
        return <div>Chargement des matchs...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-blue-600 mb-6">Tous les Matchs</h1>
            {/* Utilisation du composant MatchTable avec la liste des matchs comme prop */}
            <MatchTable matches={matches} />
        </div>
    );
};

export default AllMatches;
