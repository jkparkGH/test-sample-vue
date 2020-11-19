import { Module } from 'vuex';
import { RootState } from '@/store/root.interface';
import { UserAuthState, UserInfo, UserLoginActions } from './interface';
import AxiosService from '@/service/axios';

const staticUserInfo: UserInfo = {
  name: '',
  email: '',
  profileImage: '',
  lastConnectedAt: null
};

const tokenStringName = '__testVueAccessToken';

const UserAuth: Module<UserAuthState, RootState> = {
  namespaced: true,
  state: {
    isLogin: false,
    accessToken: '',
    userInfo: staticUserInfo
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
    },
    setCookieAccessToken(state, seconds: number) {
      document.cookie = `${tokenStringName}=${state.accessToken};path=/;domain=${document.domain};max-age=${seconds};`;
    },
    getCookieAccessToken(state) {
      const value: Array<string> | null = document.cookie.match(
        `(^|;) ?${tokenStringName}=([^;]*)(;|$)`
      );
      const result = value ? unescape(value[2]) : null;
      if (result) {
        state.accessToken = result;
        state.isLogin = true;
      }
    }
  },
  actions: {
    USER_LOGIN: ({ commit }, reqData: UserLoginActions) => {
      return new Promise((resolve, reject) => {
        AxiosService.instance
          .post('/api/login', reqData)
          .then((response) => {
            commit('setAccessToken', response.data.accessToken);
            commit('setIsLogin', true);
            commit('setCookieAccessToken', 300);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
    USER_LOGOUT: ({ commit, state }) => {
      if (state.isLogin && state.accessToken) {
        new Promise((resolve, reject) => {
          AxiosService.instance
            .post(
              '/api/logout',
              {},
              {
                headers: { Authorization: `Bearer ${state.accessToken}` }
              }
            )
            .then(() => {
              commit('setIsLogin', false);
              commit('setAccessToken', '');
              commit('setUserInfo', staticUserInfo);
              commit('setCookieAccessToken', 1);
              resolve();
            })
            .catch((error) => reject(error));
        });
      }
    },
    GET_USER_INFO: ({ commit, state }) => {
      if (
        state.isLogin &&
        state.accessToken &&
        !state.userInfo.name &&
        !state.userInfo.email &&
        !state.userInfo.profileImage
      ) {
        AxiosService.instance
          .get('/api/user', {
            headers: { Authorization: `Bearer ${state.accessToken}` }
          })
          .then((response) => {
            commit('setUserInfo', response.data);
          })
          .catch((error) => console.dir(error));
      }
    },
    CHECK_USER_COOKIE: ({ commit }) => {
      commit('getCookieAccessToken');
    }
  }
};

export default UserAuth;
