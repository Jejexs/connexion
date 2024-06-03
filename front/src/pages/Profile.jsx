import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Aucun token trouvé, redirection vers la page de connexion.");
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileInfo(data);
        } else {
          console.error("Erreur lors de la récupération du profil:", response.status, response.statusText);
          if (response.status === 401) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!profileInfo) {
    return <div className="text-center">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">Profil</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg mb-2"><strong>Nom d'utilisateur:</strong> {profileInfo.username}</p>
        <p className="text-lg mb-2"><strong>Email:</strong> {profileInfo.email}</p>
        <p className="text-lg mb-2"><strong>Jeu favori:</strong> {profileInfo.gameFav || 'Non spécifié'}</p>
        <p className="text-lg mb-2"><strong>Joueur favori:</strong> {profileInfo.playerFav || 'Non spécifié'}</p>
        <p className="text-lg"><strong>Équipe favorite:</strong> {profileInfo.teamFav || 'Non spécifié'}</p>
        <button onClick={handleLogout} className="mt-4 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          <FaSignOutAlt className="mr-2" /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Profile;
