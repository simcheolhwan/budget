interface Dictionary<A = string> {
  [index: string]: A
}

interface Database {
  balance: Balance
  annual: { [year: string]: YearData }
}

interface Balance {
  bank: Account[]
  custody: Account[]
  receivable: Account[]
}

interface Account {
  amount: number
  category?: string
  name?: string
}

interface YearData {
  income: Item[]
  expense: Item[]
}

interface Item {
  month: number
  amount: number
  category?: string
  content?: string
}
