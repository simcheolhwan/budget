interface Family {
  budget: number
  categories: FamilyCategories
  expenses: FamilyExpenses
}

interface FamilyCategories {
  annual: FamilyCategoryItem[]
  monthly: FamilyCategoryItem[]
}

interface FamilyCategoryItem {
  tag?: string
  name: string
  description?: string
  period?: string
  budget: number
  ratio?: Ratio | number
}

interface Ratio {
  min: number
  max: number
}

interface FamilyExpenses {
  [year: string]: FamilyAnnualExpenses
}

interface FamilyAnnualExpenses {
  [category: string]: FamilyExpenseItem[]
}

interface FamilyExpenseItem {
  month: number
  amount: number
  name?: string
  memo?: string
}
