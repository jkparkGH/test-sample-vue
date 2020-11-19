<template>
  <section>
    <form @submit.prevent="loginSubmit">
      <div class="input-default" style="padding-bottom: 16px;">
        <input
          type="email"
          placeholder="Email 주소를 입력해 주세요"
          v-model="userEmail"
          @keyup="validEmailForInput"
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
          v-model="userPassword"
          @keyup.prevent="validUserPasswordInput"
        />
        <p class="error-msg" v-show="userPasswordInvalid">
          {{
            `${!userPassword ? '' : '올바른 형식의'} 비밀번호를 입력해 주세요`
          }}
        </p>
      </div>
      <button type="submit" class="btn-common">
        로그인
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { EmailForm, PasswordForm } from '@/components/common/form/LoginForm';
@Component({
  mixins: [EmailForm, PasswordForm]
})
export default class LoginComponent extends Vue {
  loginSubmit() {
    const userEmail = this.$data.userEmail;
    const userEmailInvalid = this.$data.userEmailInvalid;
    const userPassword = this.$data.userPassword;
    const userPasswordInvalid = this.$data.userPasswordInvalid;

    if (
      userEmail &&
      !userEmailInvalid &&
      userPassword &&
      !userPasswordInvalid
    ) {
      console.log('login');
    }
  }
}
</script>
