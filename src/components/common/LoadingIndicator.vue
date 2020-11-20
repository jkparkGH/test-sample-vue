<template>
  <div id="loading-indicator" v-show="isLoading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoadingIndicator extends Vue.extend({
  computed: {
    isLoading() {
      return this.$store.getters['isLoading'];
    }
  }
}) {}
</script>

<style lang="scss" scoped>
$modules: 'loading-indicator';
// https://loading.io/css/
##{$modules} {
  display: block;
  position: fixed;
  top: 55px;
  left: 5px;
  width: 30px;
  height: 30px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 3px;
    border: 3px solid #e0e0e0;
    border-radius: 50%;
    animation: loading-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #e0e0e0 transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
@keyframes loading-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
