import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

function monthsAgo(n: number, day = 15): Date {
  const d = new Date()
  d.setDate(day)
  d.setMonth(d.getMonth() - n)
  d.setHours(0, 0, 0, 0)
  return d
}

async function main() {
  await prisma.transaction.deleteMany()

  const transactions = [
    // 5 months ago
    { name: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary', date: monthsAgo(5, 15) },
    { name: 'Freelance Project', amount: 800, type: 'income', category: 'Freelance', date: monthsAgo(5, 22) },
    { name: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: monthsAgo(5, 1) },
    { name: 'Groceries', amount: 280, type: 'expense', category: 'Food & Dining', date: monthsAgo(5, 5) },
    { name: 'Netflix', amount: 15, type: 'expense', category: 'Entertainment', date: monthsAgo(5, 10) },
    { name: 'Gas', amount: 60, type: 'expense', category: 'Transportation', date: monthsAgo(5, 12) },

    // 4 months ago
    { name: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary', date: monthsAgo(4, 15) },
    { name: 'Dividend Payment', amount: 200, type: 'income', category: 'Investment', date: monthsAgo(4, 20) },
    { name: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: monthsAgo(4, 1) },
    { name: 'Groceries', amount: 250, type: 'expense', category: 'Food & Dining', date: monthsAgo(4, 6) },
    { name: 'Doctor Visit', amount: 120, type: 'expense', category: 'Healthcare', date: monthsAgo(4, 14) },
    { name: 'New Clothes', amount: 180, type: 'expense', category: 'Shopping', date: monthsAgo(4, 18) },

    // 3 months ago
    { name: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary', date: monthsAgo(3, 15) },
    { name: 'Freelance Design', amount: 1500, type: 'income', category: 'Freelance', date: monthsAgo(3, 28) },
    { name: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: monthsAgo(3, 1) },
    { name: 'Restaurants', amount: 320, type: 'expense', category: 'Food & Dining', date: monthsAgo(3, 10) },
    { name: 'Gym Membership', amount: 50, type: 'expense', category: 'Healthcare', date: monthsAgo(3, 5) },
    { name: 'Online Course', amount: 200, type: 'expense', category: 'Education', date: monthsAgo(3, 20) },
    { name: 'Car Insurance', amount: 150, type: 'expense', category: 'Transportation', date: monthsAgo(3, 25) },

    // 2 months ago
    { name: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary', date: monthsAgo(2, 15) },
    { name: 'Rental Income', amount: 600, type: 'income', category: 'Rental', date: monthsAgo(2, 1) },
    { name: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: monthsAgo(2, 1) },
    { name: 'Groceries', amount: 290, type: 'expense', category: 'Food & Dining', date: monthsAgo(2, 8) },
    { name: 'New Laptop', amount: 800, type: 'expense', category: 'Shopping', date: monthsAgo(2, 15) },
    { name: 'Movie Tickets', amount: 40, type: 'expense', category: 'Entertainment', date: monthsAgo(2, 20) },

    // 1 month ago
    { name: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary', date: monthsAgo(1, 15) },
    { name: 'Rental Income', amount: 600, type: 'income', category: 'Rental', date: monthsAgo(1, 1) },
    { name: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: monthsAgo(1, 1) },
    { name: 'Groceries', amount: 260, type: 'expense', category: 'Food & Dining', date: monthsAgo(1, 7) },
    { name: 'Summer Clothes', amount: 350, type: 'expense', category: 'Shopping', date: monthsAgo(1, 18) },
    { name: 'Concert Tickets', amount: 120, type: 'expense', category: 'Entertainment', date: monthsAgo(1, 25) },

    // This month
    { name: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary', date: monthsAgo(0, 15) },
    { name: 'Freelance App', amount: 2000, type: 'income', category: 'Freelance', date: monthsAgo(0, 20) },
    { name: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: monthsAgo(0, 1) },
    { name: 'Groceries', amount: 270, type: 'expense', category: 'Food & Dining', date: monthsAgo(0, 9) },
    { name: 'Utilities', amount: 130, type: 'expense', category: 'Housing', date: monthsAgo(0, 10) },
    { name: 'Gas', amount: 70, type: 'expense', category: 'Transportation', date: monthsAgo(0, 12) },
  ]

  for (const t of transactions) {
    await prisma.transaction.create({ data: t })
  }

  console.log(`✓ Seeded ${transactions.length} transactions`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await pool.end()
  })
