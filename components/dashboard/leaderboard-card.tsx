"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

const rankIcons =[
  { icon: Trophy, color: "text-accent", bg: "bg-accent/15" },
  { icon: Medal, color: "text-muted-foreground", bg: "bg-muted" },
  { icon: Award, color: "text-chart-4", bg: "bg-chart-4/15" },
]

export function LeaderboardCard({ entries = [], currentUserId = "" }: { entries?: any[], currentUserId?: string }) {
  const { user, isLoaded } = useUser();
  const[localXp, setLocalXp] = useState(0);

  // الخدعة: بنقرأ نقطك فوراً من المتصفح عشان متتأخريش
  useEffect(() => {
    const saved = localStorage.getItem("quran-tasks-v5");
    if (saved) {
      const tasks = JSON.parse(saved);
      const xp = tasks.filter((t: any) => t.completed).reduce((acc: number, t: any) => acc + t.xp, 0);
      setLocalXp(xp);
    }
  }, []);

  // دمج اسمك ونقطك في اللوحة فوراً
  let finalLeaderboard =[...entries];
  if (isLoaded && user && localXp > 0) {
    const myIndex = finalLeaderboard.findIndex(e => e.id === user.id);
    if (myIndex !== -1) {
      finalLeaderboard[myIndex].xp = Math.max(finalLeaderboard[myIndex].xp, localXp);
    } else {
      finalLeaderboard.push({
        id: user.id,
        name: user.firstName || "بطل القرآن",
        avatar: user.imageUrl,
        xp: localXp
      });
    }
    finalLeaderboard.sort((a, b) => b.xp - a.xp); // ترتيب من الكبير للصغير
  }

  if (finalLeaderboard.length === 0) {
     return (
       <Card className="border shadow-lg">
         <CardHeader className="pb-4"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="size-5 text-accent" />لوحة المتصدرين</CardTitle></CardHeader>
         <CardContent><p className="text-center text-muted-foreground py-4">أنجز المهام لتظهر هنا!</p></CardContent>
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
          {finalLeaderboard.map((entry, index) => {
            const rank = index + 1;
            const RankIcon = rankIcons[index]?.icon;
            const rankColor = rankIcons[index]?.color;
            const rankBg = rankIcons[index]?.bg;
            const isCurrentUser = user && entry.id === user.id;

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
