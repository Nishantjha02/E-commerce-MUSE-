import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/AdminLogin.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple admin check - in production, this should be more secure
    if (credentials.email === 'admin@muse.com' && credentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'admin-authenticated');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
          <button type="submit">Login as Admin</button>
        </form>
        <p>Demo credentials: admin@muse.com / admin123</p>
      </div>
    </div>
  );
}

export default AdminLogin;