interface Dictionary<A = string> {
  [index: string]: A
}

interface Database {
  balance: Balance
  annual: { [year: string]: List }
}

interface Balance {
  bank: Account[]
  custody: Account[]
  receivable: Account[]
}

type BalanceKey = keyof Balance

interface Account {
  amount: number
  name: string
  category?: string
}

interface List {
  income: Item[]
  expense: Item[]
}

type ListKey = keyof List

interface Item {
  month: number
  name: string
  amount: number
  category?: string
}
