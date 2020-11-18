<template>
  <section>
    <h3>Step 2. 이메일 인증 코드 확인</h3>
    <div>
      <form @submit.prevent="submitVerifyAuth">
        <div class="input-default">
          <span class="_timer">{{ `# 남은시간 ${filterdTimeString()}` }}</span>
          <input
            type="text"
            placeholder="Email로 전송된 인증번호를 입력해 주세요"
            v-model="authCode"
            @keyup.prevent="validAuthCodeForInput"
          />
          <p class="error-msg" v-show="authCodeInvalid || isTimeOut">
            {{
              isTimeOut
                ? `인증 코드 유효시간이 만료되었습니다`
                : `인증번호를 입력해 주세요`
            }}
          </p>
        </div>
        <button
          type="submit"
          class="btn-common"
          :disabled="!authCode || authCodeInvalid || isTimeOut"
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
export default class VerifyEmailAuth extends Vue {
  authCode: string | null = null;
  authCodeInvalid: boolean = false;
  remainMiliseconds: number = Number(
    this.$store.getters['ChangePassword/remainMiliseconds']
  );
  isTimeOut: boolean = false;

  startCountTimer() {
    const countInterval = setInterval(() => {
      if (this.remainMiliseconds <= 0) {
        clearInterval(countInterval);
        this.isTimeOut = true;
      } else {
        this.remainMiliseconds -= 1000;
      }
    }, 1000);
  }

  filterdTimeString() {
    const crrRemainTime: number = this.remainMiliseconds / 1000;
    const min: number = Math.floor(crrRemainTime / 60);
    const sec: number = crrRemainTime % 60;
    return `${min.toString().length === 1 ? '0' + min : min}:${
      sec.toString().length === 1 ? '0' + sec : sec
    }`;
  }

  validAuthCodeForInput($event: Event) {
    this.authCode = ($event.target as HTMLInputElement).value;
    if (this.authCode === '') {
      this.authCodeInvalid = true;
    } else {
      this.authCodeInvalid = false;
    }
  }

  submitVerifyAuth() {
    if (this.authCode && !this.authCodeInvalid && !this.isTimeOut) {
      this.$store
        .dispatch('ChangePassword/VERIFY_EMAIL_AUTH', this.authCode)
        .then(() => this.$router.push('/change-password/patch'))
        .catch((error) => console.dir(error));
      // .finally(() => this.$router.push('/change-password/patch'));
    }
  }

  created() {
    this.startCountTimer();
  }
}
</script>

<style lang="scss" scoped>
._timer {
  font-size: 12px;
  color: #e07575;
  font-weight: 600;
  padding-bottom: 10px;
}
</style>
