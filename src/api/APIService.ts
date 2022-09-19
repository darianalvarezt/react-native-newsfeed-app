import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://newsapi.org',
  headers: {
    'X-Api-Key': 'fb7c4cad31cb4ba5a15ea97210f2aec5',
  },
});

instance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

instance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
});

export default instance;
