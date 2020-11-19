import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/store/root.interface';
import ChangePassword from '@/store/modules/change-password';
import UserAuth from '@/store/modules/userAuth';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: { ChangePassword, UserAuth }
};

export default new Vuex.Store(store);
