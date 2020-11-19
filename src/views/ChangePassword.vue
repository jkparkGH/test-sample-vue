<template>
  <div>
    <h1>비밀번호 변경</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ChangePassword extends Vue {
  redirectStepInvalid() {
    const stepPageInfo: Array<string> = [
      '/change-password/request',
      '/change-password/auth',
      '/change-password/patch'
    ];
    const crrStep: 1 | 2 | 3 = this.$store.getters['ChangePassword/stepNumber'];
    const crrPath: string = this.$route.path;

    if (crrPath !== stepPageInfo[crrStep - 1]) {
      return this.$router.push(stepPageInfo[crrStep - 1]);
    }
  }

  @Watch('$route.path')
  routeUpdate() {
    this.redirectStepInvalid();
  }

  created() {
    this.redirectStepInvalid();
  }

  destroyed() {
    this.$store.dispatch('ChangePassword/RESET_STATE');
  }
}
</script>
