# test-sample-vue

## Project setup

```
yarn install || npm install
```

### Compiles and hot-reloads for development

```
yarn serve || npm run serve
```

### Compiles and minifies for production

```
yarn build || npm run build
```

### Lints and fixes files

```
yarn lint || npm run lint
```

## Project Infomation

### 기능구현 (A + B + C)

#### A. 비밀번호 변경

ChangePassword.vue: `/change-password`

> [ Router childrens ]  
> path: `/change-password` : RequestEmailAuth.vue  
> path: `/change-password/auth` : VerifyEmailAuth.vue  
> path: `/change-password/patch` : PatchNewPassword.vue

#### B. 로그인

Login.vue: `/login`

> LoginComponent.vue

#### C. 회원 정보 조회 페이지

Mypage.vue: `/mypage`

> UserInfoList.vue

### 비고

- change-password > 개별 컴포넌트에 Mixin 컴포넌트(`/components/common/form/Loginform.ts`) 적용
- API 요청 함수 개별 쓰로틀링 구현
- accessToken 사용자 브라우저 임시저장 (cookie / 5분)
- 로그인 상태에 따른 ui 변경 / 페이지 redirection
