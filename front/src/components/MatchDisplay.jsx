import React from 'react';

function MatchDisplay({ match, isPast }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    const displayImageOrPlaceholder = (image_url, teamName) => (
        image_url ?
            <img src={image_url} alt={teamName} className="w-14 h-14 object-contain" /> :
            <div className="w-10 h-10 bg-purple-500 flex items-center justify-center text-white text-xl font-bold rounded-full">
                {teamName ? teamName[0] : '?'}
            </div>
    );

    const opponent1 = match.opponents[0]?.opponent || {};
    const opponent2 = match.opponents[1]?.opponent || {};

    return (
        <div className="relative rounded-xl shadow-md border border-white border-opacity-50 p-3 flex items-center justify-between" style={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.5))',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
        }}>
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
}

export default MatchDisplay;
