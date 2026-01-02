import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true); // Correctly call the function
      navigate('/manage-schedule'); // Redirect after login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;