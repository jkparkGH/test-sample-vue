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

- VSCode, prettier 사용
- CSS Framework 미사용 / 모바일 해상도 지원
- @vue/cli 사용
- typescript, vue-property-decorator 사용 지향
- Mixin 컴포넌트(/components/common/form/Loginform.ts) 활용
- API 요청 함수 개별 쓰로틀링 구현(delay: 500ms)
- accessToken 사용자 브라우저 cookie에 임시저장 (timeout: 300sec)
- 로그인 상태에 따른 ui 변경 및 페이지 redirection 구현

---

### 참고

### CommonJS(require, module.export) VS ES6(import, export) 차이점!!!

- 둘다 분리된 스크립트 코드를 불러오는 기능인데
- OLD case: 이미 계산되어있는 상태로 불러오지만,
- NEW case: 참조만 되어있는 상태로 불러온다!!!
- OLD + NEW case 이런것도 있다(동적으로 require를 사용하려는 경우)

```jsx
async function myFunc() {
  const { itsMine } = await import('./myESTest.mjs');
}
myFunc();
```

### Vue.js v-for 디렉티브: key값의 중요성

- v-for를 사용한 template는 다음과 같은 렌더링 코드로 바뀌게 된다.

```html
<div v-for="item in items" v-bind:key="item">
  Hello
</div>

// To script transfer

<script>
  _vm._l(_vm.items, function(item) {
    return _c('div', { key: item }, [_vm._v('Hello')]);
  });
</script>
```

> 여기서 \_vm.\_l은 renderList로서 \_vm.items를 for문으로 순회하는 역할을 한다. 그리고 \_c는 createElement이고, \_vm.\_v는 createTextNode를 나타낸다.

1. data의 길이가 0(혹은 초기화)에서 n의 길이가 되었을 경우 n개의 컴포넌트를 만들고 dom으로 바꾼다.

2. 1번 이후 당연히 컴포넌트는 새로 만들어졌으므로(dom으로 인스턴스화 됬으므로) created와 mounted 이벤트가 발생

3. 이후 data의 길이가 n개에서 더 증가한 m개로 증가 되었다고 가정해보면

4. 3번 이후 컴포넌트가 추가되었지만 기존의 dom자체를 파기하지는 않고 적절히 순서를 유지한다.(이전 데이터 & 새로운 데이터 순서 미정 상태)

5. 데이터가 당연히 추가되야하므로 m-n개 만큼 추가로 dom을 생성한다 당연히 추가로 생성된 컴포넌트는 created와 mounted가 발생한다.

4번에 dom자체를 파기하지 않고 이전 데이터의 순서를 유지하는것은 바로 key때문에 가능하다.

데이터가 다시 업데이트 될 때 가상돔과 돔의 key를 비교한다.

key가 지정되어있다면 이 key를 통해서 특정 녀석을 "재 렌더링 할지"정하게 된다.

> 정리: `v-for의 key 값은, 대상 리스트의 길이가 늘어나는 경우 렌더링 시에, 리렌더링을 할지 말지의 결정 기준이 되므로 v-for 사용시 key는 반드시 쓰도록 되어있으니 사용하고, 유니크한 값으로 설정하자`
