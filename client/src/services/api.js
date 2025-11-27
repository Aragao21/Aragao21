import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

export const login = (username, password) => api.post('/auth/login', { username, password });
export const sendPix = (data) => api.post('/pix/send', data);
export const receivePix = (data) => api.post('/pix/receive', data);
export const payBill = (data) => api.post('/payments', data);
export const recharge = (data) => api.post('/recharge', data);
export const fetchTransactions = () => api.get('/transactions');
export const fetchSummary = () => api.get('/transactions/summary');

export default api;
