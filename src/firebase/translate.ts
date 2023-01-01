const dictionary: Dictionary = {
  /* sign in */
  email: "이메일",
  password: "비밀번호",
  "sign in": "로그인",

  /* balance */
  bank: "은행",
  receivable: "미수",
  custody: "예치",
}

const translate = (key: string) => {
  return dictionary[key] || key
}

export default translate
