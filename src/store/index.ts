import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/store/root.interface';
import ChangePassword from '@/store/modules/change-password';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: { ChangePassword }
};

export default new Vuex.Store(store);
