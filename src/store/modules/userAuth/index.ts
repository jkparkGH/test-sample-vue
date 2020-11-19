import { Module } from 'vuex';
import { RootState } from '@/store/root.interface';
import { UserAuthState, UserInfo, UserLoginActions } from './interface';
import AxiosService from '@/service/axios';

const UserAuth: Module<UserAuthState, RootState> = {
  namespaced: true,
  state: {
    isLogin: false,
    accessToken: '',
    userInfo: {
      name: '',
      email: '',
      profileImage: '',
      lastConnectedAt: null
    }
  },
  getters: {
    isLogin: (state) => state.isLogin,
    accessToken: (state) => state.accessToken,
    userInfo: (state) => state.userInfo
  },
  mutations: {
    setIsLogin(state, params: boolean) {
      state.isLogin = params;
    },
    setAccessToken(state, params: string) {
      state.accessToken = params;
    },
    setUserInfo(state, params: UserInfo) {
      state.userInfo = {
        ...state.userInfo,
        ...params
      };
    }
  },
  actions: {
    USER_LOGIN: ({ commit, state }, reqData: UserLoginActions) => {
      return new Promise((resolve, reject) => {
        AxiosService.instance
          .post('/api/login', reqData)
          .then((response) => {
            commit('setAccessToken', response.data.accessToken);
            commit('setIsLogin', true);
            resolve();
          })
          .catch((error) => reject(error))
          .finally(() => {
            // // TEST
            // commit('setAccessToken', 'sldjfio14094==124klj1!kljasodjfoijj1');
            // commit('setIsLogin', true);
          });
      });
    }
  }
};

export default UserAuth;
