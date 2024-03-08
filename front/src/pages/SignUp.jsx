import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [equipeFavorite, setEquipeFavorite] = useState('Équipe 1'); // Initialisation avec une valeur par défaut
  const [joueurFavori, setJoueurFavori] = useState('Joueur 1'); // Initialisation avec une valeur par défaut
  const [jeuFavori, setJeuFavori] = useState('Jeu 1'); // Initialisation avec une valeur par défaut
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  // Données de test pour les champs select
  const jeux = ["Jeu 1", "Jeu 2", "Jeu 3"];
  const joueurs = ["Joueur 1", "Joueur 2", "Joueur 3"];
  const equipes = ["Équipe 1", "Équipe 2", "Équipe 3"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    // Logique pour envoyer les données au backend lors de la seconde étape
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, equipeFavorite, joueurFavori, jeuFavori }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocker le token JWT dans localStorage
        setIsAuthenticated(true); // Mettre à jour l'état d'authentification
        navigate('/profile'); // Rediriger l'utilisateur vers le profil
      } else {
        setMessage(data.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (error) {
      setMessage('Erreur réseau ou problème de serveur.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="button" onClick={() => setStep(2)}>Suivant</button>
          </>
        )}
        {step === 2 && (
          <>
            <select value={jeuFavori} onChange={(e) => setJeuFavori(e.target.value)}>
              {jeux.map(jeu => <option key={jeu} value={jeu}>{jeu}</option>)}
            </select>
            <select value={joueurFavori} onChange={(e) => setJoueurFavori(e.target.value)}>
              {joueurs.map(joueur => <option key={joueur} value={joueur}>{joueur}</option>)}
            </select>
            <select value={equipeFavorite} onChange={(e) => setEquipeFavorite(e.target.value)}>
              {equipes.map(equipe => <option key={equipe} value={equipe}>{equipe}</option>)}
            </select>
            <button type="button" onClick={() => setStep(1)}>Précédent</button>
            <button type="submit">Inscription</button>
          </>
        )}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
