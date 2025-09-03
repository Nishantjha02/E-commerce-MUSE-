import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from '../api.js';
import "./Styles/LoginRegisterCard.css";
import LockIcon from "../Assets/images/lock-icon.png";
import UserIcon from "../Assets/images/user-icon.png";

function LoginCard({ title }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isRegistering = title === "Register";
  const isLoggingIn = title === "Log In";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        alert('Registration successful!');
        navigate('/UserDashboard');
      } else {
        await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        alert('Login successful!');
        navigate('/UserDashboard');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="Login-container">
        <div className="login-bg-blur"></div>
        <div className="Login-card">
          <form className={isLoggingIn ? "Logging-in" : ""} onSubmit={handleSubmit}>
            <h1>{title}</h1>
            {isRegistering && (
              <>
                <p>Your Name</p>
                <div className="Login-input">
                  <img src={UserIcon} alt="" />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="e.g. John Doe" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            <p>Your Email</p>
            <div className="Login-input">
              <img src={UserIcon} alt="" />
              <input 
                type="email" 
                name="email"
                placeholder="e.g. elon@tesla.com" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <p>Your password</p>
            <div className="Login-input">
              <img src={LockIcon} alt="" />
              <input 
                type="password" 
                name="password"
                placeholder="e.g. aiXisthefuture" 
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {isRegistering && (
              <>
                <p>Confirm your password</p>
                <div className="Login-input">
                  <img src={LockIcon} alt="" />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="e.g. aiXisthefuture" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : title}
            </button>
            <div className="Other-options">
              {!isRegistering && <a href="./Register">Don't have an account?</a>}
              {isRegistering && <a href="./Login">Already have an account?</a>}
              {!isRegistering && <a href="/ChangePassword">Forgot password?</a>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
