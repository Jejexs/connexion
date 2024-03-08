import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
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
        const response = await fetch('http://localhost:3000/api/profile', {
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

  if (!profileInfo) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Nom d'utilisateur: {profileInfo.username}</p>
      <p>Email: {profileInfo.email}</p>
      <p>Jeu favori: {profileInfo.jeuFavori || 'Non spécifié'}</p>
      <p>Joueur favori: {profileInfo.joueurFavori || 'Non spécifié'}</p>
      <p>Équipe favorite: {profileInfo.equipeFavorite || 'Non spécifié'}</p>
    </div>
  );
};

export default Profile;
