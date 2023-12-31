// src/pages/Profile.jsx
import React from 'react';

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token'); // Ou la manière dont vous stockez le token
        const response = await fetch('http://localhost:3000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setProfileInfo(data);
        } else {
          // Gérer les erreurs ici
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
  