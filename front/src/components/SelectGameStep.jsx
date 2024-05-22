import React from 'react';
import { FaHeart } from 'react-icons/fa';

// Import des images de logos et de fond
import bgCs from '../assets/bg-cs.png';
import bgDota2 from '../assets/bg-dota2.png';
import bgLol from '../assets/bg-lol.png';

const SelectGameStep = ({ gameFav, setGameFav, jeux, onNext, onPrevious, isFirstStep }) => {

    const getBackgroundImage = (slug) => {
        switch(slug) {
            case 'cs-2': return bgCs;
            case 'dota-2': return bgDota2;
            case 'league-of-legends': return bgLol;
            default: return null;
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4 text-white text-center">Choisissez votre jeu favori</h3>
            <div className="flex flex-col p-2.5">
                {jeux.map(({ name, slug, logo }) => (
                    <label key={slug} 
                           className={`flex items-center justify-between p-0 m-1.5 rounded-lg border ${gameFav === slug ? 'bg-pink-200 border-pink-500' : 'border-gray-300'} relative cursor-pointer overflow-hidden`}
                           style={{ 
                               backgroundImage: `url(${getBackgroundImage(slug)})`,
                               backgroundPosition: 'center',
                               height: '80px'
                           }}
                        >
                        <div className="flex items-center w-full h-full p-2.5 bg-opacity-75">
                            <img src={logo} alt={`Logo de ${name}`} className="h-full mr-3" />
                            <span className="flex-grow text-center text-white">{name}</span>
                            <FaHeart className={`absolute right-2.5 top-2.5 ${gameFav === slug ? 'text-red-500' : 'text-gray-500'}`} />
                            <input 
                                type="radio" 
                                name="gameFav" 
                                value={slug}
                                checked={gameFav === slug}
                                onChange={() => setGameFav(slug)}
                                className="hidden" />
                        </div>
                    </label>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={onPrevious} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isFirstStep}>
                    Précédent
                </button>
                <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default SelectGameStep;
