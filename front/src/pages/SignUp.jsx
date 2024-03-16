import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamFav, setteamFav] = useState('Équipe 1');
  const [playerFav, setplayerFav] = useState('Joueur 1');
  const [gameFav, setgameFav] = useState('Jeu 1');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const jeux = ["Jeu 1", "Jeu 2", "Jeu 3"];
  const joueurs = ["Joueur 1", "Joueur 2", "Joueur 3"];
  const equipes = ["Équipe 1", "Équipe 2", "Équipe 3"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, teamFav, playerFav, gameFav }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/profile');
      } else {
        setMessage(data.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (error) {
      setMessage('Erreur réseau ou problème de serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setStep(2)}>
                  Suivant
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Jeu Favori
                </label>
                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={gameFav} onChange={(e) => setgameFav(e.target.value)}>
                  {jeux.map(jeu => <option key={jeu} value={jeu}>{jeu}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Joueur Favori
                </label>
                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={playerFav} onChange={(e) => setplayerFav(e.target.value)}>
                  {joueurs.map(joueur => <option key={joueur} value={joueur}>{joueur}</option>)}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Équipe Favorite
                </label>
                <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={teamFav} onChange={(e) => setteamFav(e.target.value)}>
                  {equipes.map(equipe => <option key={equipe} value={equipe}>{equipe}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setStep(1)}>
                  Précédent
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Inscription
                </button>
              </div>
            </>
          )}
        </div>
      </form>
      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default SignUp;
