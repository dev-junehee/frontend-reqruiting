export const VALIDATION = {
  userId: {
    regexp: /^[a-zA-Z0-9]+$/,
    required: "아이디는 필수 입력입니다.",
    error: "아이디는 영문과 숫자만 가능합니다."
  },
  name: {
    regexp: /[\\/:*?"<>|]/,
    required: "이름은 필수 입력입니다.",
    error: `이름에 "\\ / : * ? " < > " 은 사용할 수 없습니다.`
  },
  organization: {
    regexp: /[\\/:*?"<>|]/,
    error: `조직명에 "\\ / : * ? " < > " 은 사용할 수 없습니다.`
  }
}

export const ALERT = {
  signUp: {
    success: "회원가입에 성공했어요!",
    invalid: "입력값이 유효한지 다시 확인해 주세요!"
  }
}

export const BUTTON = {
  submit: "Submit",
  X: "X"
}

export const SIGN_UP = {
  title: "Sign Up",
  userId: "User ID",
  name: "Name",
  organization: "Organization"
}