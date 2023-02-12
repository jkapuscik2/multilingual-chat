import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://your-server-url/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', formData.email);
      props.history.push('/chat');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;