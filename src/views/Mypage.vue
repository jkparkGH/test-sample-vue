<template>
  <div>
    <h1>마이페이지</h1>
    <UserInfoList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserInfoList from '@/components/mypage/UserInfoList.vue';

@Component({
  components: { UserInfoList }
})
export default class Mypage extends Vue {}
</script>
