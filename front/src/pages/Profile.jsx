import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  // État pour stocker les informations du profil
  const [profileInfo, setProfileInfo] = useState(null);
  // Contexte d'authentification pour gérer l'état d'authentification
  const { setIsAuthenticated } = useAuth();
  // Hook pour la navigation
  const navigate = useNavigate();

  // Effet pour récupérer les informations du profil lors du montage du composant
  useEffect(() => {
    const fetchProfile = async () => {
      // Récupération du token JWT depuis le local storage
      const token = localStorage.getItem('token');
      if (!token) {
        // Si aucun token n'est trouvé, redirection vers la page de connexion
        console.error("Aucun token trouvé, redirection vers la page de connexion.");
        navigate('/login');
        return;
      }

      try {
        // Requête pour obtenir les informations du profil
        const response = await fetch('http://localhost:3000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // Si la réponse est OK, stockage des données du profil dans l'état
          const data = await response.json();
          setProfileInfo(data);
        } else {
          // Gestion des erreurs
          console.error("Erreur lors de la récupération du profil:", response.status, response.statusText);
          if (response.status === 401) {
            navigate('/login');
          }
        }
      } catch (error) {
        // Gestion des erreurs réseau
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };

    // Appel de la fonction pour récupérer les informations du profil
    fetchProfile();
  }, [navigate]);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Suppression du token du local storage et mise à jour de l'état d'authentification
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirection vers la page de connexion
    navigate('/login');
  };

  // Affichage du message de chargement si les informations du profil ne sont pas encore chargées
  if (!profileInfo) {
    return <div className="text-center">Chargement du profil...</div>;
  }

  // Rendu du profil utilisateur
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
