import React, { useState } from 'react';
import { login } from '../../api/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      alert('User logged in successfully');
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
