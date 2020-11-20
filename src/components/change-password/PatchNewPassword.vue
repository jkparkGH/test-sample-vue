<template>
  <section>
    <h3>Step 3. 새로운 비밀번호 입력</h3>
    <div>
      <form @submit.prevent="submitPatchNewPassword">
        <div class="input-default" style="padding-bottom: 16px;">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            autocomplete="off"
            v-model="userPassword"
            @keyup.prevent="validUserPasswordInput"
          />
          <p class="error-msg" v-show="userPasswordInvalid">
            {{
              `${!userPassword ? '' : '올바른 형식의'} 비밀번호를 입력해 주세요`
            }}
          </p>
        </div>
        <div class="input-default">
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            autocomplete="off"
            v-model="userPasswordConfirm"
            @keyup.prevent="validUserPasswordConfirmInput"
          />
          <p
            class="error-msg"
            v-show="matchInvalid || userPasswordConfirmInvalid"
          >
            {{
              `${
                matchInvalid
                  ? '패스워드가 일치하지 않습니다'
                  : (!userPasswordConfirm ? '' : '올바른 형식의') +
                    ' 비밀번호를 다시 입력해주세요'
              }`
            }}
          </p>
        </div>
        <button type="submit" class="btn-common" :disabled="buttonDisable">
          다음
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PasswordForm } from '@/components/common/form/LoginForm';

@Component({
  mixins: [PasswordForm]
})
export default class PatchNewPassword extends Vue.extend({
  computed: {
    matchInvalid() {
      return (
        this.$data.userPasswordConfirm &&
        this.$data.userPasswordConfirm &&
        !this.$data.isMatchedPaswords
      );
    },
    buttonDisable() {
      return (
        this.$data.userPasswordInvalid ||
        this.$data.userPasswordConfirmInvalid ||
        !this.$data.isMatchedPaswords
      );
    },
    passwordValid() {
      return (
        !this.$data.userPassword ||
        !this.$data.userPasswordConfirm ||
        this.$data.userPasswordInvalid ||
        this.$data.userPasswordConfirmInvalid ||
        this.$data.isMatchedPaswords
      );
    }
  }
}) {
  submitPatchNewPasswordProcessing: boolean = false;
  async submitPatchNewPassword() {
    const userPassword: string = this.$data.userPassword;
    const userPasswordConfirm: string = this.$data.userPasswordConfirm;
    if (!this.submitPatchNewPasswordProcessing && this.passwordValid) {
      this.submitPatchNewPasswordProcessing = true;

      try {
        await this.$store.dispatch('ChangePassword/PATCH_NEW_PASSWORD', {
          userPassword: userPassword,
          userPasswordComfirm: userPasswordConfirm
        });
        alert('비밀번호 변경이 완료되었습니다.');
        this.$router.push('/');
      } catch (error) {
        console.dir(error);
      } finally {
        setTimeout(() => {
          this.submitPatchNewPasswordProcessing = false;
        }, 500);
      }
    }
  }
}
</script>
