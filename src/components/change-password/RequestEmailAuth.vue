<template>
  <section>
    <h3>Step 1. 인증 코드 발급 요청</h3>
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
            {{
              `${!userEmail ? '' : '올바른 형식의'} 이메일 주소를 입력해 주세요`
            }}
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
import { EmailForm } from '@/components/common/form/LoginForm';
import commonAsync from '@/assets/js/commonAsync';

@Component({ mixins: [EmailForm] })
export default class RequestEmailAuth extends Vue {
  submitEmailAuthProcessing: boolean = false;

  async submitEmailAuth() {
    const userEmail = this.$data.userEmail;
    const userEmailInvalid = this.$data.userEmailInvalid;

    if (!this.submitEmailAuthProcessing && userEmail && !userEmailInvalid) {
      commonAsync(
        () => {
          return this.$store.dispatch(
            'ChangePassword/REQUEST_EMAIL_AUTH',
            userEmail
          );
        },
        () => {
          this.$router.push('/change-password/auth');
        },
        this.submitEmailAuthProcessing
      );
    }
  }
}
</script>
