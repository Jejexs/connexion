import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Accueil</div>} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
