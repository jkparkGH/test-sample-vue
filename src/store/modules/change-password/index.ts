import { Module } from 'vuex';
import { RootState } from '@/store/root.interface';
import {
  ChangePasswordState,
  VerifyEmailAUth
} from '@/store/modules/change-password/interface';
import AxiosService from '@/service/axios.service';
import { AxiosResponse } from 'axios';

const ChangePassword: Module<ChangePasswordState, RootState> = {
  namespaced: true,
  state: {
    stepNumber: 1,
    userEmail: '',
    issueToken: '',
    remainMiliseconds: 0, // MEMO: notion 페이지에 `remainMiliseconds`로 표기되어있는 상태, state명칭도 동일하게 따라감
    confirmToken: ''
  },
  getters: {
    stepNumber: (state) => state.stepNumber,
    issueToken: (state) => state.issueToken,
    remainMiliseconds: (state) => state.remainMiliseconds
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
    initRemainTime(state, remainMiliseconds: number) {
      state.remainMiliseconds = remainMiliseconds;
    },
    setConfirmToken(state, confirmToken: string) {
      state.confirmToken = confirmToken;
    }
  },
  actions: {
    async REQUEST_EMAIL_AUTH({ commit }, userEmail: string) {
      return new Promise((resolve, reject) => {
        AxiosService.get({
          url: `/api/reset-password?email=${encodeURIComponent(userEmail)}`
        })
          .then((response) => {
            resolve();
            commit('setStepNumber', 2);
            commit('setUserEmail', userEmail);
            commit('setIssueToken', response.data.issueToken);
            commit('initRemainTime', response.data.remainMiliseconds);
          })
          .catch(() => {
            reject();
          })
          .finally(() => {
            // TODO: delete Block
            console.log('## TEST REQUEST_EMAIL_AUTH ##');
            commit('setStepNumber', 2);
            commit('setUserEmail', userEmail);
            commit('setIssueToken', 'DummyissueTokenAKDJFOVVZ');
            commit('initRemainTime', 1000 * 60 * 3);
          });
      });
    },
    async VERIFY_EMAIL_AUTH({ commit, state }, authCode: string) {
      const reqData: VerifyEmailAUth = {
        email: '',
        authCode: '',
        issueToken: ''
      };

      if (!state.stepNumber || !state.userEmail || !state.issueToken) {
        return;
      } else {
        reqData.email = state.userEmail;
        reqData.authCode = authCode;
        reqData.issueToken = state.issueToken;
      }

      return new Promise((resolve, reject) => {
        AxiosService.post({
          url: `/api/reset-password`,
          reqData: reqData
        })
          .then((response) => {
            commit('setStepNumber', 3);
            commit('setConfirmToken', response.data.confirmToken);
          })
          .catch(() => {
            reject();
          })
          .finally(() => {
            // TODO: delete Block
            console.log('## TEST VERIFY_EMAIL_AUTH ##');
            commit('setStepNumber', 3);
            commit('setConfirmToken', `DummyConfirmTokenKAJOSKJQWEMNF`);
          });
      });
    }
  }
};

export default ChangePassword;
