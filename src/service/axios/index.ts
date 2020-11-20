import axios, { AxiosInstance } from 'axios';
import { SetLoadingIndicator } from '@/service/loading';

const baseURL = 'https://ably-frontend-interview-server.vercel.app';

class AxiosService {
  readonly instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 100000
  });

  setIsLoading(type: 'on' | 'off') {
    SetLoadingIndicator(type);
  }

  constructor() {
    this.instance.interceptors.request.use(
      (config) => {
        this.setIsLoading('on');
        return config;
      },
      (error) => {
        this.setIsLoading('off');
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        this.setIsLoading('off');
        return response;
      },
      (error) => {
        this.setIsLoading('off');
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
