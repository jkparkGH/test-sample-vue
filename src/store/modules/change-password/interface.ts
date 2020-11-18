export interface ChangePasswordState {
  stepNumber: number;
  userEmail: string;
  issueToken: string;
  confirmToken: string;
  remainMiliseconds: number;
}

export interface VerifyEmailAUth {
  email: string;
  authCode: string;
  issueToken: string;
}
