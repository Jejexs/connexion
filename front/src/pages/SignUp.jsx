import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import SelectGameStep from '../components/SelectGameStep';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [teamFav, setTeamFav] = useState('Équipe 1');
    const [gameFav, setGameFav] = useState('dota-2');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const jeux = [
      { name: "Dota 2", slug: "dota-2", logo: 'src/assets/dota_logo.png' },
      { name: "League of Legends", slug: "league-of-legends", logo: 'src/assets/lol_logo.png' },
      { name: "Counter-Strike 2", slug: "cs-2", logo: 'src/assets/cs_logo.png' }
    ];
    const equipes = ["Équipe 1", "Équipe 2", "Équipe 3"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, teamFav, gameFav }),
            });
            const data = await response.json();

            if (response.ok) {
                setStep(4);
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setTimeout(() => {
                    navigate('/profile');
                    setLoading(false);
                }, 5000);
            } else {
                setMessage(data.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
                setLoading(false);
            }
        } catch (error) {
            setMessage('Erreur réseau ou problème de serveur.');
            setLoading(false);
        }
    };

    const renderStepIndicator = (number) => {
        if (number < step) {
            return <div className="circle completed"><FaCheckCircle /></div>;
        } else if (number === step && step < 4) {
            return <div className="circle">{number}</div>;
        } else {
            return <div className="circle">{number}</div>;
        }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex w-full max-w-md mb-4 justify-around items-center">
              {renderStepIndicator(1)}
              <div className={`line ${step > 1 ? 'completed' : ''}`}></div>
              {renderStepIndicator(2)}
              <div className={`line ${step > 2 ? 'completed' : ''}`}></div>
              {renderStepIndicator(3)}
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded px-8 pt-6 pb-8">
              {loading && <FaSpinner className="spinner" />}
              {!loading && (
                <>
                  {step === 1 && (
                    <SelectGameStep 
                        gameFav={gameFav} 
                        setGameFav={setGameFav} 
                        jeux={jeux} 
                        onNext={() => setStep(2)} 
                        onPrevious={() => setStep(step - 1)}
                        isFirstStep={step === 1}
                    />
                  )}
                  {step === 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Équipe Favorite
                  </label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                          value={teamFav}onChange={(e) => setTeamFav(e.target.value)}>
                    {equipes.map(equipe => <option key={equipe} value={equipe}>{equipe}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="button" onClick={() => setStep(1)}>
                    Précédent
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="button" onClick={() => setStep(3)}>
                    Suivant
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                         placeholder="Email" required
                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                         placeholder="Username" required
                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                         placeholder="Password" required
                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="button" onClick={() => setStep(2)}>
                    Précédent
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="submit">
                    Inscription
                  </button>
                </div>
              </>
            )}
          </>
        )}
        {message && <p className="text-center text-red-500">{message}</p>}
    </form>
</div>
);
};

export default SignUp;