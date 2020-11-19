export interface UserInfo {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date | null;
}

export interface UserAuthState {
  isLogin: boolean;
  accessToken: string;
  userInfo: UserInfo;
}

export interface UserLoginActions {
  email: string;
  password: string;
}
