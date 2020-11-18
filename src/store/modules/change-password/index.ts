import { Module } from 'vuex';
import { EmptyState, RootState } from '@/store/root.interface';
import AxiosService from '@/service/axios.service';
import { AxiosResponse } from 'axios';

const ChangePassword: Module<EmptyState, RootState> = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async REQUEST_EMAIL_AUTH({ commit }, params) {
      const response: AxiosResponse<{}> = await AxiosService.get({
        url: `/api/reset-password?email=${encodeURIComponent(params.userEmail)}`
      });

      return response;
    }
  }
};

export default ChangePassword;
