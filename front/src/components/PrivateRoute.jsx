import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Composant pour les routes privées qui nécessite une authentification.
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants à afficher si l'utilisateur est authentifié.
 * @returns {React.ReactNode} - Les composants enfants ou une redirection vers la page de connexion.
 */
const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext); // Utilisation du contexte d'authentification

  // Vérifie si le contexte d'authentification est disponible
  if (!authContext) {
    console.error('Auth context is not available');
    return <Navigate to="/login" />;
  }

  const { isAuthenticated } = authContext; // Obtient l'état d'authentification depuis le contexte

  // Retourne les enfants si l'utilisateur est authentifié, sinon redirige vers la page de connexion
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
