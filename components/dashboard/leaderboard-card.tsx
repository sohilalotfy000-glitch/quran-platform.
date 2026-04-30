
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const rankIcons =[
  { icon: Trophy, color: "text-accent", bg: "bg-accent/15" },
  { icon: Medal, color: "text-muted-foreground", bg: "bg-muted" },
  { icon: Award, color: "text-chart-4", bg: "bg-chart-4/15" },
]

export function LeaderboardCard({ entries =[], currentUserId = "" }: { entries: any[], currentUserId?: string }) {
  if (!entries || entries.length === 0) {
     return (
       <Card className="border shadow-lg">
         <CardHeader className="pb-4"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="size-5 text-accent" />لوحة المتصدرين</CardTitle></CardHeader>
         <CardContent><p className="text-center text-muted-foreground py-4">لا يوجد متصدرين حتى الآن. كن أول من ينجز المهام!</p></CardContent>
       </Card>
     )
  }

  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="size-5 text-accent" />
          لوحة المتصدرين
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry, index) => {
            const rank = index + 1
            const RankIcon = rankIcons[index]?.icon
            const rankColor = rankIcons[index]?.color
            const rankBg = rankIcons[index]?.bg
            const isCurrentUser = entry.id === currentUserId;

            return (
              <div key={entry.id} className={cn("flex items-center gap-4 p-3 rounded-xl transition-all", isCurrentUser ? "bg-emerald-500/10 border-2 border-emerald-500/30" : "hover:bg-muted/50")}>
                <div className={cn("size-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0", RankIcon ? rankBg : "bg-muted", RankIcon ? rankColor : "text-muted-foreground")}>
                  {RankIcon ? <RankIcon className="size-5" /> : rank}
                </div>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="size-10 border-2 border-border">
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-600 font-semibold">
                      {entry.name ? entry.name.charAt(0) : "ب"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className={cn("font-semibold truncate", isCurrentUser && "text-emerald-600")}>
                      {entry.name} {isCurrentUser && " (أنت)"}
                    </p>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <p className="font-bold text-foreground">{entry.xp}</p>
                  <p className="text-xs text-muted-foreground">نقطة</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

