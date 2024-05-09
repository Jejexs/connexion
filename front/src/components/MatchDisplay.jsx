import React from 'react';

function MatchDisplay({ match }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    const displayImageOrPlaceholder = (image_url, teamName) => (
        image_url ?
        <img src={image_url} alt={teamName} className="w-10 h-10 rounded-full object-cover" /> :
        <div className="w-10 h-10 bg-purple-500 flex items-center justify-center text-white text-xl font-bold rounded-full">
            {teamName[0]}
        </div>
    );

    const isMatchUpcoming = match.status === "not_started";

    return (
        <div className="relative bg-opacity-30 bg-gradient-to-br from-black from-0% via-white via-100% to-black to-0% rounded-xl shadow-md border border-white border-opacity-50 p-3 flex items-center justify-between" style={{boxShadow: '0 0 8px white'}}>
            <div className="flex flex-col items-center w-1/4">
                {displayImageOrPlaceholder(match.opponents[0].opponent.image_url, match.opponents[0].opponent.name)}
                <span className="text-xs text-white truncate w-full text-center mt-1">{match.opponents[0].opponent.name}</span>
            </div>
            <div className="flex flex-col items-center w-1/2">
                <div className="bg-green-600 text-white text-xs rounded-full px-2 py-1 mb-1">
                    {match.league.name}
                </div>
                {!isMatchUpcoming && (
                    <div className="text-lg font-semibold my-1">
                        {match.results.map(result => result.score).join('-')}
                    </div>
                )}
                <div className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
                    {formatDate(match.begin_at)}
                </div>
            </div>
            <div className="flex flex-col items-center w-1/4">
                {displayImageOrPlaceholder(match.opponents[1].opponent.image_url, match.opponents[1].opponent.name)}
                <span className="text-xs text-white truncate w-full text-center mt-1">{match.opponents[1].opponent.name}</span>
            </div>
        </div>
    );
}

export default MatchDisplay;
