import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? '/' : 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
});

export default http;