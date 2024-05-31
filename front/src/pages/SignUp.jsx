import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import SelectGameStep from '../components/SelectGameStep';
import SelectTeamStep from '../components/SelectTeamStep';
import UserDetailsStep from '../components/UserDetailsStep';

const SignUp = () => {
  // États pour gérer les valeurs des champs de saisie
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamFav, setTeamFav] = useState('');
  const [gameFav, setGameFav] = useState('dota-2');
  const [isNewsletter, setIsNewsletter] = useState(false);
  const [step, setStep] = useState(1); // État pour gérer l'étape actuelle du formulaire
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // Jeux disponibles pour le choix
  const jeux = [
    { name: "Dota 2", slug: "dota-2", logo: 'src/assets/dota_logo.png' },
    { name: "League of Legends", slug: "league-of-legends", logo: 'src/assets/lol_logo.png' },
    { name: "Counter-Strike 2", slug: "cs-2", logo: 'src/assets/cs_logo.png' }
  ];

  // Effet pour récupérer les équipes depuis l'API
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

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si on n'est pas à la dernière étape, avancer à l'étape suivante
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
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          teamFav, 
          gameFav, 
          isNewsletter: isNewsletter ? 1 : 0 
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      console.log('Signup successful:', data);
      setStep(4); // Passer à l'étape de confirmation
      localStorage.setItem('token', data.token);
      authContext.setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/profile');
        setLoading(false);
      }, 5000);
    } catch (error) {
      console.error('Signup error:', error);
      setMessage(error.message || 'Erreur réseau ou problème de serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Affichage des étapes du formulaire */}
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
      {/* Formulaire de création de compte */}
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded px-8 pt-6 pb-8">
        {loading && (
          <div className="flex items-center justify-center">
            <FaSpinner className="spinner text-white" />
          </div>
        )}
        {!loading && (
          <>
            {/* Étape 1 : Sélection du jeu favori */}
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
            {/* Étape 2 : Sélection de l'équipe favorite */}
            {step === 2 && (
              <SelectTeamStep
                teamFav={teamFav}
                setTeamFav={setTeamFav}
                equipes={teams}
                onNext={() => setStep(3)}
                onPrevious={() => setStep(1)}
              />
            )}
            {/* Étape 3 : Informations utilisateur */}
            {step === 3 && (
              <UserDetailsStep
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                isNewsletter={isNewsletter}
                setIsNewsletter={setIsNewsletter}
                onNext={handleSubmit}
                onPrevious={() => setStep(2)}
              />
            )}
          </>
        )}
        {/* Message d'erreur ou de confirmation */}
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
      {/* Lien vers la page de connexion */}
      <div className="mt-4 text-center">
        <Link to="/login" className="text-white text-sm relative group">
          J'ai déjà un compte
          <span className="block h-0.5 bg-white absolute bottom-0 -my-1 left-0 w-0 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
