import { Module } from 'vuex';
import { RootState } from '@/store/root.interface';
import {
  ChangePasswordState,
  VerifyEmailAUth,
  PatchNewPasswordReqData,
  PatchNewPasswordActionParams
} from '@/store/modules/change-password/interface';
import AxiosService from '@/service/axios';

const staticState: ChangePasswordState = {
  stepNumber: 1,
  userEmail: '',
  issueToken: '',
  remainMillisecond: 0,
  confirmToken: ''
};

const ChangePassword: Module<ChangePasswordState, RootState> = {
  namespaced: true,
  state: staticState,
  getters: {
    stepNumber: (state) => state.stepNumber,
    remainMillisecond: (state) => state.remainMillisecond
  },
  mutations: {
    setStepNumber(state, num: number) {
      state.stepNumber = num;
    },
    setUserEmail(state, userEmail: string) {
      state.userEmail = userEmail;
    },
    setIssueToken(state, issueToken: string) {
      state.issueToken = issueToken;
    },
    initRemainTime(state, remainMillisecond: number) {
      state.remainMillisecond = remainMillisecond;
    },
    setConfirmToken(state, confirmToken: string) {
      state.confirmToken = confirmToken;
    },
    resetState(state) {
      state.stepNumber = staticState.stepNumber;
      state.userEmail = staticState.userEmail;
      state.issueToken = staticState.issueToken;
      state.remainMillisecond = staticState.remainMillisecond;
      state.confirmToken = staticState.confirmToken;
      // for(let key: string in staticState) {
      //   state[key] = staticState[key]
      // }
    }
  },
  actions: {
    REQUEST_EMAIL_AUTH({ commit }, userEmail: string) {
      return new Promise((resolve, reject) => {
        AxiosService.instance
          .get(`/api/reset-password?email=${encodeURIComponent(userEmail)}`)
          .then((response) => {
            commit('setStepNumber', 2);
            commit('setUserEmail', userEmail);
            commit('setIssueToken', response.data.issueToken);
            commit('initRemainTime', response.data.remainMillisecond);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
    VERIFY_EMAIL_AUTH({ commit, state }, authCode: string) {
      const reqData: VerifyEmailAUth = {
        email: state.userEmail,
        authCode: authCode,
        issueToken: state.issueToken
      };

      if (!reqData.email || !reqData.authCode || !reqData.issueToken) {
        return;
      } else {
        return new Promise((resolve, reject) => {
          AxiosService.instance
            .post(`/api/reset-password`, reqData)
            .then((response) => {
              commit('setStepNumber', 3);
              commit('setConfirmToken', response.data.confirmToken);
              resolve();
            })
            .catch((error) => reject(error));
        });
      }
    },
    PATCH_NEW_PASSWORD(
      { commit, state },
      params: PatchNewPasswordActionParams
    ) {
      const reqData: PatchNewPasswordReqData = {
        email: state.userEmail,
        confirmToken: state.confirmToken,
        newPassword: params.userPassword,
        newPasswordConfirm: params.userPasswordComfirm
      };

      if (
        !reqData.email ||
        !reqData.confirmToken ||
        !reqData.newPassword ||
        !reqData.newPasswordConfirm
      ) {
        return;
      } else {
        return new Promise((resolve, reject) => {
          AxiosService.instance
            .patch('/api/reset-password', reqData)
            .then(() => {
              commit('setStepNumber', 1);
              resolve();
            })
            .catch((error) => reject(error));
        });
      }
    },
    RESET_STATE({ commit }) {
      commit('resetState');
    }
  }
};

export default ChangePassword;
