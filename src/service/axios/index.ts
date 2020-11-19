import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://ably-frontend-interview-server.vercel.app';

class AxiosService {
  readonly instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 100000
  });

  constructor() {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        try {
          alert(error.response.data.error.message);
        } catch (error) {
          throw console.dir(error);
        }
        return Promise.reject(error);
      }
    );
  }
}

export default new AxiosService();
