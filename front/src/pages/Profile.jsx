// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState(null);

    console.log(profileInfo);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token'); // Ou la manière dont vous stockez le token
        console.log("Token récupéré:", token);
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
        }
      };
  
      fetchProfile();
    }, []);
  
    if (!profileInfo) {
      return <div>Loading...</div>;
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
  