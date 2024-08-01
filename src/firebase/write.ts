import { equals, evolve, map, prop, sortBy, update } from "ramda"
import { DatabaseReference, get, ref, set } from "firebase/database"
import { db } from "./config"
import { thisMonth, thisYear } from "./data"

type MaybeFormValues<T> = {
  [K in keyof T]?: string | number
}

const clean = <T>(obj: MaybeFormValues<T>): T => {
  return Object.entries(obj)
    .filter(([, value]) => value || value === 0)
    .reduce((result, [key, value]) => {
      if (key === "amount") return { ...result, [key]: Number(value) || 0 }
      if (key === "month") return { ...result, [key]: Number(value) || thisMonth }
      return { ...result, [key]: value }
    }, {} as any)
}

const val = async (ref: DatabaseReference) => {
  return (await get(ref)).val()
}

export class BalanceController {
  constructor(private key: BalanceKey) {}

  private get ref() {
    return ref(db, `/balance/${this.key}`)
  }

  private async get(): Promise<MaybeFormValues<Account>[]> {
    return (await val(this.ref)) ?? []
  }

  async update(accounts: MaybeFormValues<Account>[]) {
    await set(this.ref, accounts.map(clean))
  }

  async addAccount(account: MaybeFormValues<Account>) {
    const prev = await this.get()
    const next = prev.concat(account)
    await this.update(next)
  }

  async updateAccount(target: MaybeFormValues<Account>, updates: MaybeFormValues<Account>) {
    const prev = await this.get()
    const next = prev.map((account) => (equals(account, target) ? { ...account, ...updates } : account))
    await this.update(next)
  }

  async deleteAccount(target: MaybeFormValues<Account>) {
    const prev = await this.get()
    const next = prev.filter((account) => !equals(account, target))
    await this.update(next)
  }
}

export class ListController {
  constructor(
    private key: ListKey,
    private year = thisYear,
  ) {}

  private get ref() {
    return ref(db, `/annual/${this.year}/${this.key}`)
  }

  private async get(): Promise<MaybeFormValues<Item>[]> {
    return await val(this.ref)
  }

  async update(items: MaybeFormValues<Item>[]) {
    await set(this.ref, items.map(clean))
  }

  async addItem(item: MaybeFormValues<Item>) {
    const prev = await this.get()
    const next = prev.concat(item)
    await this.update(next)
  }

  async updateItem(target: MaybeFormValues<Item>, updates: MaybeFormValues<Item>) {
    const prev = await this.get()
    const next = prev.map((item) => (equals(item, target) ? { ...item, ...updates } : item))
    await this.update(next)
  }

  async deleteItem(target: MaybeFormValues<Item>) {
    const prev = await this.get()
    const next = prev.filter((item) => !equals(item, target))
    await this.update(next)
  }
}

export class FamilyExpensesController {
  constructor(
    private categoryName: string,
    private year = thisYear,
  ) {}

  get ref() {
    return ref(db, `/family/expenses/${this.year}/${this.categoryName}`)
  }

  async getExpenses() {
    return (await val(this.ref)) ?? []
  }

  async setCategoryExpenses(list: FamilyExpenseItem[]) {
    await set(this.ref, sortBy(prop("month"), map(evolve({ month: Number, amount: Number }), list)))
  }

  async setMonthExpense(month: number, expense: number) {
    const prev: FamilyExpenseItem[] = await this.getExpenses()
    const index = prev.findIndex((item) => item.month === month)

    if (index === -1) {
      await this.setCategoryExpenses([...prev, { month, amount: expense }])
      return
    }

    const next = update(index, { ...prev[index], amount: expense }, prev)
    await this.setCategoryExpenses(next)
  }
}
