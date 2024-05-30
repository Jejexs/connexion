import React, { useState } from 'react';
import { FaHeart, FaSpinner, FaSearch } from 'react-icons/fa';

const SelectTeamStep = ({ teamFav, setTeamFav, equipes, onNext, onPrevious }) => {
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    if (!Array.isArray(equipes) || equipes.length === 0) {
        return <div className="text-center"><FaSpinner className="animate-spin text-white" /></div>;
    }

    const filteredTeams = equipes.filter(team =>
        team && team.name && team.name.toLowerCase().includes(search.toLowerCase())
    );

    const displayImageOrPlaceholder = (image_url, teamName) => (
        image_url ?
            <img src={image_url} alt={teamName} className="mx-auto mb-2" style={{ height: '50px' }} /> :
            <div className="w-12 h-12 bg-purple-500 flex items-center justify-center text-white text-xl font-bold rounded-full mx-auto mb-2">
                {teamName ? teamName[0] : '?'}
            </div>
    );

    return (
        <div className="mt-4">
            <h3 className="text-lg text-white font-semibold mb-7 text-center">Choisissez votre équipe favorite</h3>
            <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <div className="relative">
                    <input
                        type="text"
                        id="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(search.length === 0 ? false : true)}
                        className={`pl-10 p-2 w-full text-sm text-white bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ${isFocused ? 'shadow-white' : ''}`}
                    />
                    <label
                        htmlFor="search"
                        className={`absolute left-10 transition-all duration-300 pointer-events-none text-gray-400 ${isFocused || search ? '-top-5 text-xs' : 'top-1/2 transform -translate-y-1/2'}`}
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        Rechercher une équipe...
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto custom-scrollbar p-3">
                {filteredTeams.map((team) => (
                    <label key={team.slug} className={`block p-2 relative rounded-xl shadow-md border border-white border-opacity-50 cursor-pointer transition duration-300 ${teamFav === team.slug ? 'shadow-white' : ''}`} style={{
                        background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.5))',
                        boxShadow: teamFav === team.slug ? '0 0 10px 2px rgba(255, 255, 255, 0.7)' : 'none',
                    }}>
                        <input
                            type="radio"
                            name="teamFav"
                            value={team.slug}
                            checked={teamFav === team.slug}
                            onChange={() => setTeamFav(team.slug)}
                            className="hidden" />
                        <div className="text-center">
                            {displayImageOrPlaceholder(team.image_url, team.name)}
                            <span className="block text-sm font-medium text-gray-200 truncate">{team.name || 'Unknown'}</span>
                        </div>
                        <FaHeart className={`absolute right-2 top-2 transition duration-300 ${teamFav === team.slug ? 'text-white' : 'text-gray-500'}`} />
                    </label>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={onPrevious} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                    Précédent
                </button>
                <button onClick={onNext} className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default SelectTeamStep;
