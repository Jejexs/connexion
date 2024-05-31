import React from 'react';
import Navbar from '../Navbar';

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
