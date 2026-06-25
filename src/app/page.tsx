'use client'

import { useState, useEffect, useCallback } from 'react'
import { Transaction } from '@/types'
import SummaryCards from '@/components/dashboard/SummaryCards'
import CategoryChart from '@/components/dashboard/CategoryChart'
import MonthlyChart from '@/components/dashboard/MonthlyChart'
import TransactionList from '@/components/transactions/TransactionList'
import TransactionFilters, { Filters } from '@/components/transactions/TransactionFilters'
import TransactionForm from '@/components/transactions/TransactionForm'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [filters, setFilters] = useState<Filters>({ type: 'all', category: 'all' })

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch('/api/transactions')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Transaction[] = await res.json()
      setTransactions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch transactions:', err)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const filteredTransactions = transactions.filter((t) => {
    if (filters.type !== 'all' && t.type !== filters.type) return false
    if (filters.category !== 'all' && t.category !== filters.category) return false
    return true
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this transaction?')) return
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingTransaction(null)
  }

  const handleFormSuccess = () => {
    handleFormClose()
    fetchTransactions()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your income and expenses
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CategoryChart transactions={transactions} />
          <MonthlyChart transactions={transactions} />
        </div>

        <Separator className="my-8" />

        {/* Transactions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold">Transactions</h2>
              <p className="text-sm text-muted-foreground">
                {filteredTransactions.length} of {transactions.length} transactions
              </p>
            </div>
            <TransactionFilters filters={filters} onFilterChange={setFilters} />
          </div>

          <TransactionList
            transactions={filteredTransactions}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {/* Add / Edit Dialog */}
      <TransactionForm
        open={isFormOpen}
        transaction={editingTransaction}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}
