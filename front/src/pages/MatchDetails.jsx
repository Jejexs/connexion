import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MatchDisplay from '../components/MatchDisplay';
import BackButton from '../components/BackButton';

/**
 * Page de détails du match affichant les informations complètes d'un match.
 */
const MatchDetails = () => {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('summary');

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/matches/${id}`);
                setMatch(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchDetails();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    if (loading) {
        return <div className="text-white">Chargement...</div>;
    }

    if (error) {
        return <div className="text-white">Erreur : {error}</div>;
    }

    if (!match) {
        return <div className="text-white">Aucune information sur le match disponible.</div>;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'summary':
                return (
                    <div className="text-center text-white py-11">
                        {match.status === 'finished' && match.results.length > 0 ? (
                            <div className="text-lg font-semibold my-1">
                                <p className="text-lg">Détails des match à venir</p>
                            </div>
                        ) : (
                            <p className="text-lg">Détails des match à venir</p>
                        )}
                    </div>
                );
            // Ajoutez ici les autres contenus des onglets (TAT, Tableau, Effectifs)
            default:
                return <p className="text-lg py-11">Aucune Information</p>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <div className="text-center text-white w-full max-w-3xl">
                <BackButton />
                <div className="flex justify-between w-full mb-4 mt-4">
                    <span className="text-sm">{match.league.name}</span>
                    <span className="text-sm">{formatDate(match.begin_at)}</span>
                </div>
                <MatchDisplay match={match} isPast={match.status === 'finished'} disableHover={true} disableLink={true} />
                <div className="flex justify-around mt-4">
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`font-bold py-2 px-4 rounded-full transition duration-300 ${activeTab === 'summary' ? 'bg-white text-black' : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'}`}
                    >
                        Résumé
                    </button>
                    <button
                        onClick={() => setActiveTab('tat')}
                        className={`font-bold py-2 px-4 rounded-full transition duration-300 ${activeTab === 'tat' ? 'bg-white text-black' : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'}`}
                    >
                        TAT
                    </button>
                    <button
                        onClick={() => setActiveTab('tableau')}
                        className={`font-bold py-2 px-4 rounded-full transition duration-300 ${activeTab === 'tableau' ? 'bg-white text-black' : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'}`}
                    >
                        Tableau
                    </button>
                    <button
                        onClick={() => setActiveTab('effectifs')}
                        className={`font-bold py-2 px-4 rounded-full transition duration-300 ${activeTab === 'effectifs' ? 'bg-white text-black' : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'}`}
                    >
                        Effectifs
                    </button>
                </div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default MatchDetails;
