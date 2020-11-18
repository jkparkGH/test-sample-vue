<template>
  <div>
    <h1>비밀번호 변경</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ChangePassword extends Vue {}
</script>
