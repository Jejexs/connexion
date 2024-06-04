import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant pour afficher les informations d'un match.
 * @param {Object} match - L'objet match contenant les détails du match.
 * @param {boolean} isPast - Indique si le match est passé.
 * @param {boolean} disableHover - Indique si les animations de hover doivent être désactivées.
 * @param {boolean} disableLink - Indique si le lien vers les détails du match doit être désactivé.
 */
function MatchDisplay({ match, isPast, disableHover, disableLink }) {
    /**
     * Formate une date pour n'afficher que l'heure.
     * @param {string} dateString - La date à formater.
     * @returns {string} - L'heure formatée en français.
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    /**
     * Affiche l'image d'une équipe ou un espace réservé si l'image n'est pas disponible.
     * @param {string} image_url - URL de l'image de l'équipe.
     * @param {string} teamName - Nom de l'équipe.
     * @returns {JSX.Element} - Élément JSX représentant l'image ou l'espace réservé.
     */
    const displayImageOrPlaceholder = (image_url, teamName) => (
        image_url ?
            <img src={image_url} alt={teamName} className="w-14 h-14 object-contain" /> :
            <div className="w-10 h-10 bg-purple-500 flex items-center justify-center text-white text-xl font-bold rounded-full">
                {teamName ? teamName[0] : '?'}
            </div>
    );

    // Récupération des informations des deux équipes
    const opponent1 = match.opponents[0]?.opponent || {};
    const opponent2 = match.opponents[1]?.opponent || {};

    const content = (
        <div className={`relative rounded-xl shadow-md border border-white border-opacity-50 p-4 my-4 flex items-center justify-between bg-gradient-to-br from-white/30 to-black/50 ${disableHover ? '' : 'transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]'}`}>
            <div className="flex flex-col items-center w-1/4">
                {displayImageOrPlaceholder(opponent1.image_url, opponent1.name)}
                <span className="text-xs text-white truncate w-full text-center mt-1">{opponent1.name || 'Unknown'}</span>
            </div>
            <div className="flex flex-col items-center w-1/2">
                <div className="bg-[#cffafe] text-black text-xs rounded-full px-2 py-1 mb-1">
                    {match.league.name}
                </div>
                {isPast && (
                    <div className="text-lg font-semibold my-1">
                        {match.results.map(result => result.score).join('-')}
                    </div>
                )}
                <div className="bg-[#E5627D] text-white text-xs rounded-full px-2 py-1">
                    {formatDate(match.begin_at)}
                </div>
            </div>
            <div className="flex flex-col items-center w-1/4">
                {displayImageOrPlaceholder(opponent2.image_url, opponent2.name)}
                <span className="text-xs text-white truncate w-full text-center mt-1">{opponent2.name || 'Unknown'}</span>
            </div>
        </div>
    );

    return disableLink ? content : <Link to={`/match/${match.id}`}>{content}</Link>;
}

export default MatchDisplay;
