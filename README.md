# # test-sample-vue

---

#### Project setup

`yarn install` || `npm install`

#### Compiles and hot-reloads for development

`yarn serve` || `npm run serve`

#### Compiles and minifies for production

`yarn build` || `npm run build`

#### Lints and fixes files

`yarn lint` || `npm run lint`

---

## | Project Infomation

### | 기능구현 (A + B + C)

#### A. 비밀번호 변경

View/ChangePassword.vue: `/change-password`

> [ Router childrens ]  
> path: `/change-password/request` : /components/change-password/RequestEmailAuth.vue  
> path: `/change-password/auth` : /components/change-password/VerifyEmailAuth.vue  
> path: `/change-password/patch` : /components/change-password/PatchNewPassword.vue

#### B. 로그인

View/Login.vue: `/login`

> /components/login/LoginComponent.vue

#### C. 회원 정보 조회 페이지

View/Mypage.vue: `/mypage`

> /components/mypage/UserInfoList.vue

### | 비고

- CSS Framework 미사용 / 모바일 해상도 지원
- @vue/cli로 구성
- typescript, vue-property-decorator 사용 지향
- Mixin 컴포넌트(/components/common/form/Loginform.ts) 활용
- API 요청 함수 개별 쓰로틀링 구현(delay: 500ms)
- accessToken 사용자 브라우저 cookie에 임시저장 (timeout: 300sec)
- 로그인 상태에 따른 ui 변경 및 페이지 redirection 구현

---
