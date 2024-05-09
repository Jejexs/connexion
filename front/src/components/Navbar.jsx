import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import homeIcon from '../assets/accueil.png';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-white text-black' : '';
  };

  return (
    <div className="fixed inset-x-0 bottom-0 mb-5 mx-5 flex justify-center z-50">
      <nav className="text-white h-20 rounded-full shadow-xl shadow-white/30 max-w-screen-md w-full border border-gray-200 border-opacity-25" style={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.99), rgba(0, 0, 0, 0.5))',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
        }}>
        <div className="flex justify-around items-center w-full h-full text-sm">
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}>
            <img src={homeIcon} alt="Accueil" className="w-6 h-6 mb-1" /> Accueil
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/signup" className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/signup')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}>
                <img src={homeIcon} alt="Inscription" className="w-6 h-6 mb-1" /> Inscription
              </Link>
              <Link to="/login" className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/login')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}>
                <img src={homeIcon} alt="Connexion" className="w-6 h-6 mb-1" /> Connexion
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/profile')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}>
                <img src={homeIcon} alt="Profil" className="w-6 h-6 mb-1" /> Profil
              </Link>
              <Link to="/matches" className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/matches')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}>
                <img src={homeIcon} alt="Matchs" className="w-6 h-6 mb-1" /> Matchs
              </Link>
              <button onClick={handleLogout} className="flex flex-col items-center justify-center w-full h-full bg-red-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-white/50">
                <img src={homeIcon} alt="Déconnexion" className="w-6 h-6 mb-1" /> Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
