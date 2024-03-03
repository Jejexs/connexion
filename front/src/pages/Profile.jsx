import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection en cas d'erreur

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Ou la manière dont vous stockez le token
      console.log("Token récupéré:", token);

      // Vérification préliminaire pour s'assurer qu'un token est présent
      if (!token) {
        console.error("Aucun token trouvé, redirection vers la page de connexion.");
        navigate('/login'); // Redirection vers la page de connexion si aucun token n'est trouvé
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
          // Gestion des réponses non-OK, comme 401 Unauthorized
          console.error("Erreur lors de la récupération du profil:", response.status, response.statusText);
          if (response.status === 401) {
            // En cas de 401 Unauthorized, rediriger vers la page de connexion
            navigate('/login');
          }
        }
      } catch (error) {
        // Gestion des erreurs de fetch, comme des problèmes de réseau
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };

    fetchProfile();
  }, [navigate]); // Ajoutez navigate comme dépendance pour éviter des avertissements de React

  if (!profileInfo) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Nom d'utilisateur: {profileInfo.username}</p>
      <p>Email: {profileInfo.email}</p>
    </div>
  );
};

export default Profile;
