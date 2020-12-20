<template>
  <section class="user-info-container">
    <div>
      <button type="button" class="btn-common _logout" @click="logoutSubmit">
        Logout
      </button>
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
      <li>
        <h4># 프로필 사진</h4>
        <div class="profile-container">
          <img
            v-if="userInfo.profileImage"
            :src="userInfo.profileImage"
            alt="Mypage user profile image."
            loading="lazy"
          />
        </div>
        <span class="profile-url">url: {{ userInfo.profileImage || '-' }}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';

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

  logoutSubmit() {
    if (!this.logoutSubmitProcessing) {
      this.logoutSubmitProcessing = true;
      this.USER_LOGOUT.then(() => {
        this.$router.push('/');
      })
        .catch((error) => console.dir(error))
        .finally(() => {
          this.logoutSubmitProcessing = false;
        });
    }
  }

  isLoginValid() {
    if (!this.isLogin) {
      alert('로그인이 필요합니다');
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
.user-info-container {
  position: relative;
  button._logout {
    position: fixed;
    top: 70px;
    right: 20px;
  }
}

$modules: 'user-info-list';
.#{$modules} {
  padding-top: 24px;
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
    .profile-container {
      min-width: 100px;
      min-height: 100px;
      max-width: 240px;
      margin-left: 12px;
      background-color: #efefef;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
    }
    .profile-url {
      font-size: 10px;
      color: #efefef;
      width: 100%;
      display: block;
      word-break: break-all;
      padding-right: 10px;
      padding-top: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
