import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* Icône du menu burger */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
        <div className={`md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center gap-4`}>
          <Link className="hover:bg-gray-700 px-3 py-2 rounded" to="/">Accueil</Link>
          {!isAuthenticated && (
            <>
              <Link className="hover:bg-gray-700 px-3 py-2 rounded" to="/signup">Inscription</Link>
              <Link className="hover:bg-gray-700 px-3 py-2 rounded" to="/login">Connexion</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link className="hover:bg-gray-700 px-3 py-2 rounded" to="/profile">Profil</Link>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Déconnexion</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
