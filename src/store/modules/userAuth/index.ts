import { Module } from 'vuex';
import { RootState } from '@/store/root.interface';
import { UserAuthState, UserInfo, UserLoginActions } from './interface';
import AxiosService from '@/service/axios';
import { AxiosResponse } from 'axios';

const defaultUserInfo: UserInfo = {
  name: '',
  email: '',
  profileImage: '',
  lastConnectedAt: null
};

const tokenStringName = '__testVueAccessToken';
const localDummyString = '=eyxz';

const UserAuth: Module<UserAuthState, RootState> = {
  namespaced: true,
  state: {
    isLogin: false,
    accessToken: '',
    userInfo: Object.assign({}, defaultUserInfo)
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
      state.userInfo = params;
    },
    setCookieAccessToken(state, seconds: number) {
      document.cookie = `${tokenStringName}=${localDummyString}${state.accessToken};path=/;domain=${document.domain};max-age=${seconds};`;
    },
    getCookieAccessToken(state) {
      const value: Array<string> | null = document.cookie.match(
        `(^|;) ?${tokenStringName}=([^;]*)(;|$)`
      );
      const result = value ? unescape(value[2]) : null;
      if (result) {
        state.accessToken = result.replace(localDummyString, '');
        state.isLogin = true;
      }
    }
  },
  actions: {
    async USER_LOGIN({ commit }, reqData: UserLoginActions) {
      if (reqData.email && reqData.password) {
        const response: AxiosResponse<{
          accessToken: string;
        }> = await AxiosService.instance.post('/api/login', reqData);

        commit('setAccessToken', response.data.accessToken);
        commit('setIsLogin', true);
        commit('setCookieAccessToken', 300);
      }
    },
    async USER_LOGOUT({ commit, state }) {
      if (state.isLogin && state.accessToken) {
        await AxiosService.instance.post(
          '/api/logout',
          {},
          {
            headers: { Authorization: `Bearer ${state.accessToken}` }
          }
        );

        commit('setIsLogin', false);
        commit('setAccessToken', '');
        commit('setUserInfo', Object.assign({}, defaultUserInfo));
        commit('setCookieAccessToken', 1);
      }
    },
    async GET_USER_INFO({ commit, state }) {
      if (
        state.isLogin &&
        state.accessToken &&
        !state.userInfo.name &&
        !state.userInfo.email &&
        !state.userInfo.profileImage
      ) {
        const response: AxiosResponse<UserInfo> = await AxiosService.instance.get(
          '/api/user',
          {
            headers: { Authorization: `Bearer ${state.accessToken}` }
          }
        );

        commit('setUserInfo', response.data);
      }
    },
    CHECK_USER_COOKIE({ commit }) {
      commit('getCookieAccessToken');
    }
  }
};

export default UserAuth;
