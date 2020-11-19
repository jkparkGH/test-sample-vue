<template>
  <div>
    <h1>로그인</h1>
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from '@/components/login/LoginComponent.vue';
@Component({
  components: {
    LoginComponent
  }
})
export default class Login extends Vue {}
</script>
