import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>
      {!isAuthenticated && <>
        <Link to="/signup">Inscription</Link>
        <Link to="/login">Connexion</Link>
      </>}
      {isAuthenticated && <>
        <Link to="/profile">Profil</Link>
        <button onClick={handleLogout}>Déconnexion</button>
      </>}
    </nav>
  );
};

export default Navbar;
