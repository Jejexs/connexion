import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaNewspaper, FaCalendarAlt, FaUser } from 'react-icons/fa';

/**
 * Composant pour afficher la barre de navigation en bas de la page.
 */
const Navbar = () => {
  const { isAuthenticated } = useAuth(); // Obtient l'état d'authentification depuis le contexte Auth
  const location = useLocation(); // Obtient l'emplacement actuel de la route

  /**
   * Vérifie si le chemin donné est le chemin actuel.
   * @param {string} path - Chemin de la route.
   * @returns {string} - Classes CSS pour le lien actif.
   */
  const isActive = (path) => {
    return location.pathname === path ? 'bg-white text-black' : 'text-white';
  };

  return (
    <div className="fixed inset-x-0 bottom-0 mb-5 mx-5 flex justify-center z-50">
      <nav
        className="text-white h-20 rounded-full shadow-xl max-w-screen-md w-full border border-gray-200 border-opacity-25"
        style={{
          background: 'radial-gradient(circle at 100% 0%, #4f0c79, #000000, transparent 70%), radial-gradient(circle at 0% 100%, #000000, #350b50, transparent 70%), radial-gradient(circle at 100% 100%, #4f0c79, #000000)',
          boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="flex justify-around items-center w-full h-full text-xs">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}
          >
            <FaHome className="w-6 h-6 mb-1" /> Accueil
          </Link>
          <Link
            to="/news"
            className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/news')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}
          >
            <FaNewspaper className="w-6 h-6 mb-1" /> Actualité
          </Link>
          <Link
            to="/calendar"
            className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/calendar')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}
          >
            <FaCalendarAlt className="w-6 h-6 mb-1" /> Calendrier
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-105 px-3 rounded-full ${isActive('/profile')} hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/50`}
          >
            <FaUser className="w-6 h-6 mb-1" /> Compte
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
