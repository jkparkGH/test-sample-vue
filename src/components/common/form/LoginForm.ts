import { Component, Vue } from 'vue-property-decorator';

@Component
export class EmailForm extends Vue {
  userEmail: string | null = null;
  userEmailInvalid: boolean = false;

  checkValidEmail(email: string) {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;
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
}

@Component
export class PasswordForm extends Vue {
  userPassword: string | null = null;
  userPasswordConfirm: string | null = null;
  userPasswordInvalid: boolean = false;
  userPasswordConfirmInvalid: boolean = false;
  isMatchedPaswords: boolean = false;

  checkValidPassword(password: string) {
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    return regExp.test(password);
  }

  validMatchPassword() {
    if (this.userPassword && this.userPasswordConfirm) {
      this.isMatchedPaswords = this.userPassword === this.userPasswordConfirm;
    }
  }

  validUserPasswordInput($event: Event) {
    this.userPassword = ($event.target as HTMLInputElement).value;
    if (this.userPassword === '') {
      this.userPasswordInvalid = true;
    } else if (!this.checkValidPassword(this.userPassword)) {
      this.userPasswordInvalid = true;
    } else {
      this.userPasswordInvalid = false;
    }
    this.validMatchPassword();
  }

  validUserPasswordConfirmInput($event: Event) {
    this.userPasswordConfirm = ($event.target as HTMLInputElement).value;
    if (this.userPasswordConfirm === '') {
      this.userPasswordConfirmInvalid = true;
    } else if (!this.checkValidPassword(this.userPasswordConfirm)) {
      this.userPasswordConfirmInvalid = true;
    } else {
      this.userPasswordConfirmInvalid = false;
    }
    this.validMatchPassword();
  }
}
