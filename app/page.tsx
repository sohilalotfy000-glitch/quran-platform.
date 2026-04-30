// @ts-nocheck
import { TasksCard } from "@/components/dashboard/tasks-card"
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card"
import { Coins } from "lucide-react"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { getDashboardData } from "@/app/actions"

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getDashboardData();
  const leaderboard = data?.leaderboard ||[];
  const currentUserId = data?.currentUserId || "";

  const currentUserEntry = leaderboard.find((e: any) => e.id === currentUserId);
  const myTotalXp = currentUserEntry ? currentUserEntry.xp : 0;

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
                <span>{myTotalXp}</span> <Coins className="size-4" />
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 space-y-6">
            <TasksCard type="lecture" />
          </div>
          <div className="space-y-6">
            <LeaderboardCard entries={leaderboard} currentUserId={currentUserId} />
          </div>
        </div>
      </main>
    </div>
  )
}
