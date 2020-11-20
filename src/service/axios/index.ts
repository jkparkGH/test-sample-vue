import axios, { AxiosInstance } from 'axios';
import { SetLoadingIndicator } from '@/service/loading';
import Store from '@/store';

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
    console.log('constructor ON', Store);

    // SetLoadingIndicator('on');
    this.instance.interceptors.response.use(
      (response) => {
        // SetLoadingIndicator('off');
        return response;
      },
      (error) => {
        // SetLoadingIndicator('off');
        try {
          alert(error.response.data.error.message);
        } catch (error) {
          alert(error);
        }
        return Promise.reject(error);
      }
    );
  }
}

export default new AxiosService();
