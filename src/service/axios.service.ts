import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://ably-frontend-interview-server.vercel.app';

class AxiosService {
  private instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
      // `Authorization: Bearer ${JWT}`
    },
    timeout: 100000
  });

  constructor() {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public get({ url = '/' }) {
    return this.instance.get(url);
  }
}

export default new AxiosService();
