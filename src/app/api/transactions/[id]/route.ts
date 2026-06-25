import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, amount, type, category, date } = body

    const transaction = await db.transaction.update({
      where: { id },
      data: {
        name,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date(date),
      },
    })

    return NextResponse.json(transaction)
  } catch {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.transaction.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 })
  }
}
