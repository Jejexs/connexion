import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          localStorage.setItem('token', token);
          setIsAuthenticated(true); 
          navigate('/profile'); 
          setMessage('Connexion réussie !');
        } else {
          setIsAuthenticated(false);
          setMessage(data.message || 'Identifiants incorrects.');
          setError(true);
        }
      } catch (error) {
        setIsAuthenticated(false); 
        setMessage('Erreur dans le l\'email ou le mot de passe.');
        setError(true);
      }
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className={`w-full max-w-xs p-8 ${error ? 'animate-shake' : ''}`}>
        <div className="mb-8 relative">
          <input
            className={`pl-3 p-2 w-full text-sm text-white bg-transparent border border-white rounded-lg focus:outline-none transition duration-300 ${isEmailFocused || email ? 'shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]' : ''}`}
            id="email"
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(email.length === 0 ? false : true)}
            readOnly={loading}
          />
          <label
            htmlFor="email"
            className={`absolute left-3 transition-all duration-300 pointer-events-none text-white ${isEmailFocused || email ? '-top-5 text-xs' : 'top-1/2 transform -translate-y-1/2'}`}
          >
            Email
          </label>
        </div>
        <div className="mb-8 relative">
          <input
            className={`pl-3 p-2 w-full text-sm text-white bg-transparent border border-white rounded-lg focus:outline-none transition duration-300 ${isPasswordFocused || password ? 'shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]' : ''}`}
            id="password"
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(password.length === 0 ? false : true)}
            readOnly={loading}
          />
          <label
            htmlFor="password"
            className={`absolute left-3 transition-all duration-300 pointer-events-none text-white ${isPasswordFocused || password ? '-top-5 text-xs' : 'top-1/2 transform -translate-y-1/2'}`}
          >
            Mot de passe
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button 
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit" 
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Connexion'}
          </button>
        </div>
        {message && <p className="text-center text-red-500 text-xs mt-4">{message}</p>}
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-white text-sm relative group">
            Créer un compte
            <span className="block h-0.5 bg-white absolute bottom-0 -my-1 left-0 w-0 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
