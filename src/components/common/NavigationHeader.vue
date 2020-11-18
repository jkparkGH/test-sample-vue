<template>
  <nav class="navigation-header">
    <div class="navigation-header__container">
      <h1 class="navigation-header__home">
        <router-link to="/">M<span>ain</span></router-link>
      </h1>
      <ul class="navigation-header__route-list">
        <li v-show="!isLogin">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-show="!isLogin">
          <router-link to="/change-password">
            Change-password
          </router-link>
        </li>
        <li v-show="!isLogin">
          <router-link to="/mypage">Mypage</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class NavigationHeader extends Vue {
  private isLogin: boolean = false;
}
</script>

<style scoped lang="scss">
$modules: 'navigation-header';
.#{$modules} {
  height: 50px;
  overflow: hidden;
  border-bottom: 1px solid #e1e1e1;
  &__container {
    position: fixed;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    z-index: 3;
  }
  &__home {
    padding: 10px;
    width: 40px;
    text-align: center;
    display: inline-block;
    box-sizing: content-box;
    a {
      color: #0e0e0e;
      span {
        font-size: 14px;
      }
    }
  }
  &__route-list {
    float: right;
    padding-right: 10px;
    font-size: 16px;
    @media screen and (max-width: 320px) {
      padding-right: 0;
      font-size: 14px;
    }
    &:after {
      content: '';
      display: table;
      clear: both;
    }
    li {
      float: left;
      a {
        color: #0e0e0e;
        padding: 15.5px 10px;
        display: inline-block;
        font-weight: 600;
      }
    }
  }
}
</style>
