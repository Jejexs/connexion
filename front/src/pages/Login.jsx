// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Ajouter cette ligne pour utiliser setIsAuthenticated

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log(data); // Pour le débogage

      if (response.ok) {
        const token = data.token; // Supposons que le token est renvoyé sous cette forme
        localStorage.setItem('token', token); // Stocker le token
        console.log("Token stocké:", localStorage.getItem('token')); // Vérification du stockage du token
        
        setIsAuthenticated(true); // Mettre à jour l'état d'authentification
        navigate('/profile'); // Redirige vers la page de profil
        setMessage('Connexion réussie !');
      } else {
        setIsAuthenticated(false); // Assurez-vous de réinitialiser l'authentification en cas d'échec
        setMessage(data.message || 'Identifiants incorrects.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setIsAuthenticated(false); // Réinitialiser l'authentification en cas d'erreur réseau
      setMessage('Erreur réseau ou problème de serveur.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
