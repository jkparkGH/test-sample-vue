import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('../views/ChangePassword.vue'),
    children: [
      {
        path: '',
        name: 'RequestEmailAuth',
        component: () =>
          import('../components/change-password/RequestEmailAuth.vue')
      },
      {
        path: 'auth',
        name: 'VerifyEmailAuth',
        component: () =>
          import('../components/change-password/VerifyEmailAuth.vue')
      },
      {
        path: 'patch',
        name: 'PatchNewPassword',
        component: () =>
          import('../components/change-password/PatchNewPassword.vue')
      }
    ]
  },
  {
    path: '/Mypage',
    name: 'Mypage',
    component: () => import('../views/Mypage.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
