interface Database {
  balance: Balance
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
