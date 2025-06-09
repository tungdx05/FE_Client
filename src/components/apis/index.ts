import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-cua-may.com/api', // Thay URL đúng backend
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
