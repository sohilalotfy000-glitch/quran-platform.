import { StatsGrid } from "@/components/dashboard/stats-grid"
import { TasksCard } from "@/components/dashboard/tasks-card"
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card"
import { BadgesCard } from "@/components/dashboard/badges-card"
import { Coins, Gem, ListTodo, Trophy } from "lucide-react"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <nav className="sticky top-0 z-50 w-full bg-[#0f172a] text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg font-bold">قرآن</div>
          </div>
          
          {/* هنا خلينا المهام والمتصدرون بس */}
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-2 text-emerald-400 font-bold cursor-pointer"><ListTodo className="size-4"/> المهام</span>
            <span className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-emerald-400"><Trophy className="size-4"/> المتصدرون</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-full px-4 border border-slate-700">
              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <span>108</span> <Coins className="size-4" />
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center gap-1 text-blue-400 font-bold">
                <span>12</span> <Gem className="size-4" />
              </div>
            </div>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm">
                  تسجيل الدخول
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8 space-y-6">
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TasksCard type="lecture" />
          </div>
          <div className="space-y-6">
            <LeaderboardCard />
            <BadgesCard />
          </div>
        </div>
      </main>
    </div>
  )
}
