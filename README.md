# [머플] 채용 과제 전형 리뷰
> [기존 구현 요구사항 내용 README.md](https://github.com/dev-junehee/frontend-reqruiting/wiki/Murple-Frontend-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%B1%84%EC%9A%A9-%EA%B3%BC%EC%A0%9C)

<br />

## 구현 완료 사항
### 1. InputText 클리어 버튼 추가
- [x] 우측에 보더 안쪽으로 X 버튼을 추가합니다.
- [x] 사용자가 이 버튼을 클릭하면 입력된 내용이 삭제됩니다.
- [x] X버튼은 InputText에 포커스가 있고, 내용이 있을 때만 노출합니다.
- [x] InputText 컴포넌트의 보더 디자인은 변경되지 않아야 합니다. (기존 스타일과 동일)
- [x] 버튼 디자인은 자유롭게 설정 가능합니다.

### 2. SignUpForm 유효성 검사 추가
- [x] User ID는 알파벳과 숫자만 허용하며, 반드시 작성되어야 합니다.
- [x] Name은 `\ / : * ? " < > |` 특수문자가 허용되지 않으며, 반드시 작성되어야 합니다.
- [x] Organization은 `\ / : * ? " < > |` 특수문자가 허용되지 않으며, 작성하지 않아도 됩니다.

<br />

## 세부 구현 내용
### InputText
- X버튼은 재사용 측면과 유지보수를 위해 별도 컴포넌트로 분리하여 구현했습니다.
- X버튼에 position: absolute를 적용하고, label 태그를 기반으로 위치를 조정했습니다. (InputText의 스타일을 변경하지 않고, 우측 내부에 존재하게 하기 위함)
- watch를 통해 각 입력값과 포커스 여부를 관찰하여 X버튼 표시 유무를 처리했습니다.
- X버튼을 클릭했을 때 이벤트가 전파를 막기 위해 evnet.stopPropagation()을 사용해서 추가 이벤트 전파를 막고, 입력값을 클리어 처리했습니다.

### SignUpForm
- React로 프로젝트 개발 시 React-Hook-Form을 편리하게 사용했던 경험이 있어 라이브러리 사용없이도 비슷하게 동작할 수 있도록 구현했습니다.
- 필수값 여부, 유효성 검사 내용, 에러 메세지 등을 상수화하여 객체 단위로 관리하고 모듈로 불러와 사용했습니다.
- watch를 통해 각 입력값의 변화를 관찰하여 유효성 검사 통과 여부에 따라 에러 메세지를 변경해주고, 텍스트필드 하단에 에러 메세지를 노출해 사용자가 즉각적으로 피드백을 받을 수 있도록 처리했습니다.
- 사용자가 Submit 버튼을 눌렀을 경우, 입력값이 아무것도 없을 때를 대비하여 각 요소에 대해 한 번 더 유효성 검사를 실행해주었습니다.
- Submit 버튼 클릭 시점에는 각 요소의 유효성 검사 여부가 모두 true일 경우에만 회원가입 성공 Alert가 보여지고, 그 외에는 각 입력값에 대한 에러 메세지를 노출합니다.

### 그 외
- 리터럴한 문자열을 사용하는 것을 지양하기 때문에 가능한 문자열을 모두 상수화하여 사용했습니다.
- 코드 컨벤션 측면에서 변수, 상수, 함수명이 모두 일정하게 느껴지도록 노력했습니다.
- 코드 가독성을 위해 초기 코드에서 함수간 한 줄 띄어쓰기를 추가했습니다.

<br />

## 프로젝트 관리 및 브랜치 전략
- Issue와 Pull Request 템플릿을 추가하여 프로젝트를 문서화하고 흐름을 읽을 수 있도록 관리했습니다.
- 각 Issue는 작은 작업 단위별로 구분하고, Issue와 Pull Request 생성 시 템플릿에 맞는 내용 기재를 통해 다른 개발자가 봐도 업무 내용이 이해될 수 있도록 신경 썼습니다. 
- 매 작업마다 Issue와 연결된 브랜치를 생성하여 개발했습니다.
- 간단한 구현이기 때문에 거창한 브랜치 전략을 세우기보다 main 브랜치에서 각 기능 브랜치를 분기하여 작업하고, 개발이 완료된 후 PR을 통해 main 브랜치에 merge를 진행했습니다.
- PR 시에는 협업자나 코드 리뷰어가 한 눈에 확인할 수 있도록 작업물의 UI를 추가했습니다.
- [사용했던 Issue](https://github.com/dev-junehee/frontend-reqruiting/issues?q=is%3Aissue+is%3Aclosed)
- [지난 Pull Request](https://github.com/dev-junehee/frontend-reqruiting/pulls?q=is%3Apr+is%3Aclosed)

<br />

## 트러블슈팅
### InputText에 내용이 있을 때, 포커스 해제 시에도 X버튼이 계속 표시되는 문제
**원인**
- InputText에 focus, blur 핸들러를 할당한 상태에서 InputText의 레이어 위에 X버튼을 얹어두었을 때, X버튼이 클릭되면서 InputText의 포커스가 해제되고, 포커스가 해제되면 X버튼 표시 여부를 담당하는 변수(isShow)의 값이 false 처리되기 때문에 X버튼을 누를 수 없게 됩니다.
- X버튼을 누를 수 있도록 표시하기 위해 watch를 통해 model이 변경될 때를 감지하여 입력값이 있을 때 isShow를 true로 처리하였는데 이 부분 때문에 포커스가 해제되어도 X버튼이 계속 표시되었습니다.

**해결**
- watch에서 InputText의 포커스 여부를 담당하는 변수(isFocus)를 함께 관찰하여 포커스가 있을 때를 함께 핸들링해주었습니다.
- X버튼을 누를 때 InputText의 포커스가 해제되기 때문에 해당 부분은 Blur 시점에 실행되는 핸들러의 실행 시점을 setTimeOut을 통해 일정 시간 뒤로 지연시켜 X버튼을 클릭할 수 있는 물리적 시간을 확보해주면서 해결하였습니다.
- 해당 트러블슈팅을 겪은 [Issue](https://github.com/dev-junehee/frontend-reqruiting/issues/7)와 [Pull Request](https://github.com/dev-junehee/frontend-reqruiting/pull/4) 링크를 첨부합니다.

<br />

## 회고
- Vue.js와 pnpm, TailwindCSS를 모두 처음 사용해보았습니다.
- 기존 React를 사용했을 때와 비교해보자면, Vue가 조금 더 HTML 문법에 친화적이라고 느껴졌습니다.
- @focus, @blur를 통해 이벤트 핸들러를 쉽게 할당할 수 있는 부분이 편리했습니다. 특히 v-if, v-show와 같이 조건문 처리하는 구문에서 React보다 간결해서 좋았습니다.
- ref를 선언하는 구문이 React의 useState 선언 구문보다 간단했지만, value 값으로 접근해야 한다는 점이 조금 불편하다고 느껴진 것 같습니다.
- pnpm은 설치 속도가 npm에 비해서 훨씬 빠르다고 느껴져서 좋았는데, 이번 기회로 찾아보니 디스크 공간도 덜 차지하면서 확실한 장점이 있는 패키지 매니저라고 생각했습니다.
- Tailwind CSS는 처음 보기에는 리터럴하게 태그 내부에 코드를 넣어두는 것이 불편하고 가독성이 안 좋다고 느껴졌는데, 사용해보니 확실히 개발 시간이 단축되어 개발 효율성 측면에서 좋다고 느껴졌습니다. CSS, CSS-in-JS를 사용할 때는 태그와 스타일 코드를 번갈아보는 부분에서 불편함이 있었는데, Tailwind는 스타일이 적용된 태그를 한 눈에 볼 수 있는 것이 큰 메리트라고 느껴졌습니다. 초기 프로덕트를 빠르게 완성시켜야하는 서비스가 있을 때 사용하면 좋을 거 같습니다.
- 컴포넌트 구현, 유효성 검사 구현과 같이 평소에 자주하는 개발 스타일임에도 불구하고 예상하지 못한 잔오류가 있어 긴장을 많이 했던 거 같습니다. 개발 시작 전 조금 더 충분한 고민의 시간을 가졌더라면 어땟을까 하는 조금의 아쉬움이 남습니다.
- 처음 사용하는 프레임워크와 도구가 많아 제가 개발을 처음 시작했을 때가 생각났습니다. "If you hurts, do it more often!" 어려우면 더 자주 하라는 어떤 시니어 개발자 분의 말씀이 떠올랐습니다. 지금 익숙하지 않더라도 더 자주 많이 부딪히며 스스로를 발전시켜 나가야겠다고 생각했습니다. 소중한 기회 주셔서 감사합니다.

<br />

## 참고자료
- [Vue.js](https://vuejs.org/)
- [Vue Composition API 핵심 패턴 w. 타입스크립트](https://www.heropy.dev/p/zDWwNL)
- [Vue.js Form Validation](https://v2.ko.vuejs.org/v2/cookbook/form-validation.html)
- [[TIL # 46] Vue 이메일/비밀번호 유효성 검사](https://velog.io/@yejine2/TIL-46-Vue-유효성검사)
- [[Vue.js] Vue3 : Vuetify Form-validation 유효성 검사](https://devel-log.tistory.com/71)
- [Vue 로그인 input validation](https://jamkim-playground.tistory.com/entry/VUE-%EB%A1%9C%EA%B7%B8%EC%9D%B8-input-validation)
- [Tailwind CSS](https://tailwindcss.com/)
- [[tailwind css] Font size, Colors](https://taejinkim-devlog.tistory.com/144)
- [RegExp.prototype.test()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
