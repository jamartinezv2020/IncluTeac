// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { authenticateUser } from '../services/apiService'; // Importa la función de autenticación

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await authenticateUser({ email, password });
      localStorage.setItem('token', token); // Guarda el JWT en el localStorage
      alert('Logged in successfully');
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
