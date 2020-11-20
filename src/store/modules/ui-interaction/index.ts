import { Module } from 'vuex';
import { RootState } from '@/store/root.interface';

const UiInteraction: Module<
  {
    isLoading: boolean;
  },
  RootState
> = {
  namespaced: false,
  state: {
    isLoading: false
  },
  getters: {
    isLoading: (state) => state.isLoading
  },
  mutations: {
    setIsLoading(state, value: boolean): void {
      state.isLoading = value;
    }
  },
  actions: {
    SET_IS_LOADING({ commit }, value: boolean) {
      console.log('SET_IS_LOADING', value);
      commit('setIsLoading', value);
    }
  }
};

export default UiInteraction;
