import { DollarSign } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center gap-2">
        <div className="flex items-center gap-2 text-primary">
          <DollarSign className="h-6 w-6" />
          <span className="text-xl font-bold">BudgetTracker</span>
        </div>
      </div>
    </header>
  )
}
