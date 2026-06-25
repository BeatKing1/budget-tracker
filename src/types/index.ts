export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  name: string
  amount: number
  type: TransactionType
  category: string
  date: string
  createdAt: string
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Housing',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other',
] as const

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Rental',
  'Other',
] as const
