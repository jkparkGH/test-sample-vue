export interface ChangePasswordState {
  stepNumber: number;
  userEmail: string;
  issueToken: string;
  confirmToken: string;
  remainMillisecond: number;
}

export interface VerifyEmailAuthReqData {
  email: string;
  authCode: string;
  issueToken: string;
}

export interface PatchNewPasswordActionParams {
  userPassword: string;
  userPasswordComfirm: string;
}

export interface PatchNewPasswordReqData {
  email: string;
  confirmToken: string;
  newPassword: string;
  newPasswordConfirm: string;
}
