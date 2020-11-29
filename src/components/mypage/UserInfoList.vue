<template>
  <section class="user-info-container">
    <div>
      <button type="button" class="btn-common _logout" @click="logoutSubmit">
        Logout
      </button>
    </div>
    <div class="profile-container">
      <h4 class="_blind"># 프로필 사진</h4>
      <div class="profile-image">
        <img
          v-if="userInfo.profileImage"
          :src="userInfo.profileImage"
          alt="Mypage user profile image."
          loading="lazy"
        />
      </div>
      <span class="profile-url">url: {{ userInfo.profileImage || '-' }}</span>
    </div>
    <ul class="user-info-list">
      <li>
        <h4># 이름</h4>
        <span>{{ userInfo.name || '-' }}</span>
      </li>
      <li>
        <h4># 이메일</h4>
        <span>{{ userInfo.email || '-' }}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import commonAsync from '@/assets/js/commonAsync';

@Component
export default class UserInfoList extends Vue.extend({
  computed: {
    ...mapGetters({
      isLogin: 'UserAuth/isLogin',
      userInfo: 'UserAuth/userInfo'
    }),
    ...mapActions({
      GET_USER_INFO: 'UserAuth/GET_USER_INFO',
      USER_LOGOUT: 'UserAuth/USER_LOGOUT'
    })
  }
}) {
  logoutSubmitProcessing: boolean = false;

  async logoutSubmit() {
    if (
      window.confirm('로그아웃 하시겠습니까?') &&
      !this.logoutSubmitProcessing
    ) {
      commonAsync(
        () => {
          return this.USER_LOGOUT;
        },
        () => {
          this.$router.push('/');
        },
        this.logoutSubmitProcessing
      );
    }
  }

  isLoginValid() {
    if (!this.isLogin) {
      alert('Login이 필요합니다');
      this.$router.push('/login');
    } else {
      this.GET_USER_INFO;
    }
  }

  created() {
    this.isLoginValid();
  }
}
</script>

<style lang="scss" scoped>
$modules: 'user-info-container';
.#{$modules} {
  position: relative;
  ._blind {
    display: none;
  }
  button._logout {
    position: fixed;
    top: 70px;
    right: 20px;
  }
  .profile-container {
    overflow: hidden;
    position: relative;
    padding-right: 24px;
    padding-bottom: 24px;
    display: inline-block;
    vertical-align: top;
    .profile-image {
      min-width: 100px;
      min-height: 100px;
      max-width: 180px;
      background-color: #efefef;
      border-radius: 6px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .profile-url {
    font-size: 10px;
    color: #efefef;
    opacity: 0;
    width: 100%;
    display: block;
    word-break: break-all;
    padding-right: 10px;
    padding-top: 5px;
    box-sizing: border-box;
    position: absolute;
  }
  .user-info-list {
    display: inline-block;
    vertical-align: top;
    padding-top: 12px;
    padding-right: 20px;
    li {
      h4 {
        font-size: 16px;
        padding-bottom: 8px;
      }
      span {
        font-size: 14px;
        padding-left: 12px;
      }
      & + li {
        margin-top: 32px;
      }
    }
  }
}
</style>
