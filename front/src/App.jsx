import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import AllMatches from './pages/AllMatches';
import Calendar from './pages/Calendar'; // Importez le nouveau composant Calendar
import Layout from './components/layout/Layout';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='animate-gradient'>
          <Layout>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/matches" element={<AllMatches />} />
              <Route path="/calendar" element={<Calendar />} /> 
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
