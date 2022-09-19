import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://newsapi.org',
  headers: {
    'X-Api-Key': 'fb7c4cad31cb4ba5a15ea97210f2aec5',
  },
});

export default instance;
