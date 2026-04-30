
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const rankIcons =[
  { icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
  { icon: Medal, color: "text-slate-500", bg: "bg-slate-100" },
  { icon: Award, color: "text-amber-700", bg: "bg-amber-100" },
]

export function LeaderboardCard({ entries = [], currentUserId = "" }: { entries?: any[], currentUserId?: string }) {
  if (!entries || entries.length === 0) {
     return (
       <Card className="border shadow-lg">
         <CardHeader className="pb-4"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="size-5 text-yellow-500" />أوائل الكورس</CardTitle></CardHeader>
         <CardContent><p className="text-center text-muted-foreground py-4">أنجز المهام لتكون أول المتصدرين!</p></CardContent>
       </Card>
     )
  }

  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Trophy className="size-6 text-yellow-500" />
          أوائل الكورس
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry, index) => {
            const rank = index + 1;
            const RankIcon = rankIcons[index]?.icon;
            const rankColor = rankIcons[index]?.color;
            const rankBg = rankIcons[index]?.bg;
            const isCurrentUser = entry.id === currentUserId;

            return (
              <div key={entry.id} className={cn("flex items-center gap-4 p-3 rounded-xl transition-all", isCurrentUser ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50 border border-slate-100")}>
                <div className={cn("size-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0", RankIcon ? rankBg : "bg-white border", RankIcon ? rankColor : "text-slate-500")}>
                  {RankIcon ? <RankIcon className="size-5" /> : rank}
                </div>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="size-10 border-2 border-white shadow-sm">
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-600 font-semibold">
                      {entry.name ? entry.name.charAt(0) : "ب"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className={cn("font-semibold truncate text-sm", isCurrentUser ? "text-emerald-700" : "text-slate-700")}>
                      {entry.name} {isCurrentUser && " (أنت)"}
                    </p>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <p className={cn("font-bold", isCurrentUser ? "text-emerald-600" : "text-slate-600")}>{entry.xp}</p>
                  <p className="text-[10px] text-muted-foreground">نقطة</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
