import { TasksCard } from "@/components/dashboard/tasks-card"
import { Coins } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <nav className="sticky top-0 z-50 w-full bg-[#0f172a] text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="bg-emerald-500 p-2 rounded-lg font-bold text-sm md:text-base">
            برمج ذاكرتك بالقرآن
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-full px-4 border border-slate-700">
              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <span>0</span> <Coins className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8 space-y-6">
        <div className="max-w-4xl mx-auto mt-4">
          <TasksCard type="lecture" />
        </div>
      </main>
    </div>
  )
}
