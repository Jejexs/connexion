// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>
      {!isAuthenticated && <Link to="/signup">Inscription</Link>}
      {!isAuthenticated && <Link to="/login">Connexion</Link>}
      {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
    </nav>
  );
};

export default Navbar;
