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
