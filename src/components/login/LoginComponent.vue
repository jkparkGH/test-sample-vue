<template>
  <section>
    <form @submit.prevent="loginSubmit">
      <div class="input-default" style="padding-bottom: 16px;">
        <input
          type="email"
          placeholder="Email 주소를 입력해 주세요"
          v-model="userEmail"
          @keyup="validEmailForInput"
          title="ably452@dummy.com"
        />
        <p class="error-msg" v-show="userEmailInvalid">
          {{
            `${!userEmail ? '' : '올바른 형식의'} 이메일 주소를 입력해 주세요`
          }}
        </p>
      </div>
      <div class="input-default">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autocomplete="off"
          v-model="userPassword"
          @keyup.prevent="validUserPasswordInput"
          title="!abc32***"
        />
        <p class="error-msg" v-show="userPasswordInvalid">
          {{
            `${!userPassword ? '' : '올바른 형식의'} 비밀번호를 입력해 주세요`
          }}
        </p>
      </div>
      <button type="submit" class="btn-common" :disabled="invalidLogin">
        로그인
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EmailForm, PasswordForm } from '@/components/common/form/LoginForm';
@Component({
  mixins: [EmailForm, PasswordForm]
})
export default class LoginComponent extends Vue.extend({
  computed: {
    invalidLogin() {
      return (
        !this.$data.userEmail ||
        this.$data.userEmailInvalid ||
        !this.$data.userPassword ||
        this.$data.userPasswordInvalid
      );
    }
  }
}) {
  loginSubmitProcessing: boolean = false;

  async loginSubmit() {
    const userEmail = this.$data.userEmail;
    const userEmailInvalid = this.$data.userEmailInvalid;
    const userPassword = this.$data.userPassword;
    const userPasswordInvalid = this.$data.userPasswordInvalid;

    if (
      !this.loginSubmitProcessing &&
      userEmail &&
      !userEmailInvalid &&
      userPassword &&
      !userPasswordInvalid
    ) {
      this.loginSubmitProcessing = true;

      try {
        await this.$store.dispatch('UserAuth/USER_LOGIN', {
          email: userEmail,
          password: userPassword
        });
        this.$router.push('/mypage');
      } catch (error) {
        console.dir(error);
      } finally {
        setTimeout(() => {
          this.loginSubmitProcessing = false;
        }, 500);
      }
    }
  }
}
</script>
