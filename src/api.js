import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/club-members',
  withCredentials:true
});
export const apiLogin = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
});

export default api; 