<template>
  <section>
    <h3>| 인증 코드 발급 요청</h3>
    <div>
      <form @submit.prevent="submitEmailAuth">
        <div class="input-default">
          <input
            type="email"
            placeholder="Email 주소를 입력해 주세요"
            v-model="userEmail"
            @keyup="validEmailForInput"
          />
          <p class="error-msg" v-show="userEmailInvalid">
            올바른 이메일 주소를 입력해 주세요
          </p>
        </div>
        <button
          type="submit"
          class="btn-common"
          :disabled="!userEmail || userEmailInvalid"
        >
          다음
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RequestEmailAuth extends Vue {
  userEmail: string | null = null;
  userEmailInvalid: boolean = false;

  checkValidEmail(email: string) {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]).*.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
  }

  validEmailForInput($event: Event) {
    this.userEmail = ($event.target as HTMLInputElement).value;
    if (this.userEmail === '') {
      this.userEmailInvalid = true;
    } else if (!this.checkValidEmail(this.userEmail)) {
      this.userEmailInvalid = true;
    } else {
      this.userEmailInvalid = false;
    }
  }

  submitEmailAuth() {
    if (this.userEmail && !this.userEmailInvalid) {
      this.$store
        .dispatch('ChangePassword/REQUEST_EMAIL_AUTH', this.userEmail)
        .then(() => this.$router.push('/change-password/auth'));
    }
  }
}
</script>
