import React from 'react';
import Navbar from '../Navbar';

/**
 * Composant de mise en page générale pour l'application.
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants à rendre dans le layout.
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        {children}
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
