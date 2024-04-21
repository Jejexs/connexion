import React, { useState } from 'react';
import { FaHeart, FaSpinner } from 'react-icons/fa';

const SelectTeamStep = ({ teamFav, setTeamFav, equipes, onNext, onPrevious }) => {
    const [search, setSearch] = useState('');

    if (!Array.isArray(equipes) || equipes.length === 0) {
        return <div className="text-center"><FaSpinner className="animate-spin" /></div>;
    }

    const filteredTeams = equipes.filter(team =>
        team && team.name && team.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6);

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Choisissez votre équipe favorite</h3>
            <input
                type="text"
                placeholder="Rechercher une équipe..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-4 p-2 w-full text-sm text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            />
            <div className="grid grid-cols-3 gap-4">
                {filteredTeams.map((team) => (
                    <label key={team.slug} className="block p-2 border rounded-lg cursor-pointer relative"
                        style={{ backgroundColor: teamFav === team.slug ? '#f3f4f6' : '#fff' }}>
                        <input
                            type="radio"
                            name="teamFav"
                            value={team.slug}
                            checked={teamFav === team.slug}
                            onChange={() => setTeamFav(team.slug)}
                            className="hidden" />
                        <div className="text-center">
                            <span className="block text-sm font-medium text-gray-700 mb-1">{team.name}</span>
                            <img src={team.image_url} alt={`Logo de ${team.name}`} className="mx-auto" style={{ height: '50px' }} />
                        </div>
                        <FaHeart className={`absolute right-2 top-2 ${teamFav === team.slug ? 'text-red-500' : 'text-gray-300'}`} />
                    </label>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={onPrevious} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Précédent
                </button>
                <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default SelectTeamStep;
