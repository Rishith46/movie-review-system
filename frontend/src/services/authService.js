import API from './api';

export const register = async (userData) => {
  const { data } = await API.post('/auth/register', userData);
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const login = async (credentials) => {
  const { data } = await API.post('/auth/login', credentials);
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};