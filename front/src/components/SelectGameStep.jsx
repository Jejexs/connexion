import React from 'react';
import { FaHeart } from 'react-icons/fa';

// Import des images de logos et de fond
import bgCs from '../assets/bg-cs.png';
import bgDota2 from '../assets/bg-dota2.png';
import bgLol from '../assets/bg-lol.png';

/**
 * Composant pour la sélection du jeu favori lors de l'inscription.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.gameFav - Le jeu favori sélectionné.
 * @param {Function} props.setGameFav - Fonction pour définir le jeu favori sélectionné.
 * @param {Array} props.jeux - Liste des jeux disponibles.
 * @param {Function} props.onNext - Fonction pour passer à l'étape suivante.
 * @param {Function} props.onPrevious - Fonction pour revenir à l'étape précédente.
 * @param {boolean} props.isFirstStep - Indique si cette étape est la première étape.
 */
const SelectGameStep = ({ gameFav, setGameFav, jeux, onNext, onPrevious, isFirstStep }) => {

    // Fonction pour obtenir l'image de fond en fonction du jeu sélectionné
    const getBackgroundImage = (slug) => {
        switch (slug) {
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
                        className={`flex items-center justify-between p-0 m-1.5 rounded-lg border ${gameFav === slug ? ' shadow-white' : 'border-gray-300'} relative cursor-pointer overflow-hidden transition duration-300`}
                        style={{
                            backgroundImage: `url(${getBackgroundImage(slug)})`,
                            backgroundPosition: 'center',
                            height: '80px',
                            boxShadow: gameFav === slug ? '0 0 10px 2px rgba(255, 255, 255, 0.7)' : 'none',
                        }}
                    >
                        <div className={`flex items-center w-full h-full p-2.5 transition duration-300 ${gameFav === slug ? 'bg-white bg-opacity-20' : 'bg-opacity-0'}`}>
                            <img src={logo} alt={`Logo de ${name}`} className={`h-full mr-3 transition duration-300 ${gameFav === slug ? 'filter grayscale contrast-200 brightness-200' : ''}`} />
                            <span className={`flex-grow text-center transition duration-300 ${gameFav === slug ? 'text-gray-200' : 'text-white'}`}>{name}</span>
                            <FaHeart className={`absolute right-2.5 top-2.5 transition duration-300 ${gameFav === slug ? 'text-white' : 'text-gray-500'}`} />
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
                <button onClick={onPrevious} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isFirstStep}>
                    Précédent
                </button>
                <button onClick={onNext} className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default SelectGameStep;
