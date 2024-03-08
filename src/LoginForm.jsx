import React, { useState } from 'react';
import { successToast } from './toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      user: email,
      pass: password
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const responseData = await response.json(); // Parse the JSON response
      successToast(responseData.message); // Use the message from the response

    } catch (error) {
      console.error('Login failed:', error.message);
    } finally {
      setEmail('');
      setPassword('');
    }
  };


  return (
    <div className="maincontainer">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>

  );
}

export default LoginForm;
