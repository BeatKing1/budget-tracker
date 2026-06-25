'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/types'

export interface Filters {
  type: string
  category: string
}

interface TransactionFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

const ALL_CATEGORIES = [
  ...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]),
] as string[]

export default function TransactionFilters({
  filters,
  onFilterChange,
}: TransactionFiltersProps) {
  const categories =
    filters.type === 'income'
      ? (INCOME_CATEGORIES as readonly string[])
      : filters.type === 'expense'
        ? (EXPENSE_CATEGORIES as readonly string[])
        : ALL_CATEGORIES

  return (
    <div className="flex gap-2 flex-wrap">
      <Select
        value={filters.type}
        onValueChange={(value) =>
          onFilterChange({ type: value ?? 'all', category: 'all' })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(value) =>
          onFilterChange({ ...filters, category: value ?? 'all' })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
