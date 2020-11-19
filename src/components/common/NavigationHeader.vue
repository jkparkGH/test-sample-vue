<template>
  <nav class="navigation-header">
    <div class="navigation-header__container">
      <h1 class="navigation-header__home">
        <router-link to="/">M<span>ain</span></router-link>
      </h1>
      <ul class="navigation-header__route-list">
        <li v-show="!isLogin">
          <router-link to="/login"><span>L</span>ogin</router-link>
        </li>
        <li>
          <router-link to="/change-password/request">
            <span>C</span>hange-password
          </router-link>
        </li>
        <li v-show="isLogin">
          <router-link to="/mypage"><span>M</span>ypage</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  computed: {
    isLogin() {
      return this.$store.getters['UserAuth/isLogin'];
    }
  }
})
export default class NavigationHeader extends Vue {}
</script>

<style scoped lang="scss">
$modules: 'navigation-header';
.#{$modules} {
  height: 50px;
  overflow: hidden;
  &__container {
    position: fixed;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    background-color: #fff;
    border-bottom: 1px solid #e1e1e1;
    z-index: 3;
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }
  &__home {
    padding: 10px;
    padding-top: 11px;
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
    @media screen and (max-width: 320px) {
      padding-right: 0;
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
        padding: 14.5px 10px;
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        span {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
