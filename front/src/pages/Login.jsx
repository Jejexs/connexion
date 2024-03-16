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

      if (response.ok) {
        const token = data.token; // Supposons que le token est renvoyé sous cette forme
        localStorage.setItem('token', token); // Stocker le token
        setIsAuthenticated(true); // Mettre à jour l'état d'authentification
        navigate('/profile'); // Redirige vers la page de profil
        setMessage('Connexion réussie !');
      } else {
        setIsAuthenticated(false); // Assurez-vous de réinitialiser l'authentification en cas d'échec
        setMessage(data.message || 'Identifiants incorrects.');
      }
    } catch (error) {
      setIsAuthenticated(false); // Réinitialiser l'authentification en cas d'erreur réseau
      setMessage('Erreur réseau ou problème de serveur.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Connexion
          </button>
        </div>
      </form>
      {message && <p className="text-center text-red-500 text-xs">{message}</p>}
    </div>
  );
};

export default Login;
