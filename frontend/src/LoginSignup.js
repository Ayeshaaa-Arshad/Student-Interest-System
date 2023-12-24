// LoginSignupPage.js
import React, { useState } from 'react';
import {axios} from 'react';
import './LoginSignup.css';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/login/', loginData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/signup/', signupData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Signup failed:', error.response.data.error);
    }
  };

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="login-signup-container">
      <button onClick={toggleForm} className="toggle-button">
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>

      {isLogin ? (
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="loginUsername">Username:</label>
              <input
                type="text"
                id="loginUsername"
                value={loginData.loginUsername}
                onChange={(e) => setLoginData({ ...loginData, loginUsername: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                id="loginPassword"
                value={loginData.loginPassword}
                onChange={(e) => setLoginData({ ...loginData, loginPassword: e.target.value })}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <h1>Signup</h1>
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label htmlFor="signupUsername">Username:</label>
              <input
                type="text"
                id="signupUsername"
                value={signupData.signupUsername}
                onChange={(e) => setSignupData({ ...signupData, signupUsername: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signupPassword">Password:</label>
              <input
                type="password"
                id="signupPassword"
                value={signupData.signupPassword}
                onChange={(e) => setSignupData({ ...signupData, signupPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
              />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginSignupPage;
