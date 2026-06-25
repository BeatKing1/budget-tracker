import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const transactions = await db.transaction.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(transactions)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, amount, type, category, date } = body

    const transaction = await db.transaction.create({
      data: {
        name,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date(date),
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
  }
}
