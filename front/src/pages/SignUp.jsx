import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import SelectGameStep from '../components/SelectGameStep';
import SelectTeamStep from '../components/SelectTeamStep';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamFav, setTeamFav] = useState('');
  const [gameFav, setGameFav] = useState('dota-2');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const jeux = [
    { name: "Dota 2", slug: "dota-2", logo: 'src/assets/dota_logo.png' },
    { name: "League of Legends", slug: "league-of-legends", logo: 'src/assets/lol_logo.png' },
    { name: "Counter-Strike 2", slug: "cs-2", logo: 'src/assets/cs_logo.png' }
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        console.log('Fetching teams from API');
        const response = await fetch('http://localhost:3000/api/teams');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setTeams(data);
        console.log('Teams loaded:', data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        setMessage('Erreur lors de la récupération des équipes: ' + error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting signup form');
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, teamFav, gameFav }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const data = await response.json();
      console.log('Signup successful:', data);
      setStep(4);
      localStorage.setItem('token', data.token);
      authContext.setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/profile');
        setLoading(false);
      }, 5000);
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Erreur réseau ou problème de serveur: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex w-full max-w-md mb-4 justify-around items-center">
        {Array.from({ length: 3 }, (_, i) => (
          <React.Fragment key={i}>
            <div className={`circle ${step > i + 1 ? 'completed' : ''}`}>
              {step > i + 1 ? <FaCheckCircle /> : i + 1}
            </div>
            {i < 2 && <div className={`line ${step > i + 1 ? 'completed' : ''}`}></div>}
          </React.Fragment>
        ))}
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
              <SelectTeamStep
                teamFav={teamFav}
                setTeamFav={setTeamFav}
                equipes={teams}
                onNext={() => setStep(3)}
                onPrevious={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username" required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
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
