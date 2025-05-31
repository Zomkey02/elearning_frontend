import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // your Laravel backend URL
  withCredentials: true,            // important to send cookies for Sanctum
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

export default api;
