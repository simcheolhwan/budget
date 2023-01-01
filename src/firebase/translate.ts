const dictionary: Dictionary = {
  bank: "은행",
  receivable: "미수",
  custody: "예치",
}

const translate = (key: string) => {
  return dictionary[key] || key
}

export default translate
