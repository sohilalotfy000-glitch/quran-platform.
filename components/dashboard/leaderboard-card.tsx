"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardEntry {
  id: string
  name: string
  avatar?: string
  points: number
  level: number
  isCurrentUser?: boolean
}

interface LeaderboardCardProps {
  entries?: LeaderboardEntry[]
  compact?: boolean
}

const defaultEntries: LeaderboardEntry[] = [
  { id: "1", name: "أحمد محمد", points: 12450, level: 24, avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "2", name: "فاطمة علي", points: 11820, level: 23, avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "3", name: "محمد خالد", points: 10950, level: 22, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "4", name: "أنت", points: 8750, level: 18, isCurrentUser: true },
  { id: "5", name: "سارة أحمد", points: 8200, level: 17, avatar: "https://i.pravatar.cc/150?img=9" },
]

const rankIcons = [
  { icon: Trophy, color: "text-accent", bg: "bg-accent/15" },
  { icon: Medal, color: "text-muted-foreground", bg: "bg-muted" },
  { icon: Award, color: "text-chart-4", bg: "bg-chart-4/15" },
]

export function LeaderboardCard({ entries = defaultEntries, compact = false }: LeaderboardCardProps) {
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

            return (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all",
                  entry.isCurrentUser
                    ? "bg-primary/10 border-2 border-primary/30"
                    : "hover:bg-muted/50"
                )}
              >
                {/* Rank */}
                <div
                  className={cn(
                    "size-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0",
                    RankIcon ? rankBg : "bg-muted",
                    RankIcon ? rankColor : "text-muted-foreground"
                  )}
                >
                  {RankIcon ? <RankIcon className="size-5" /> : rank}
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="size-10 border-2 border-border">
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {entry.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className={cn(
                      "font-semibold truncate",
                      entry.isCurrentUser && "text-primary"
                    )}>
                      {entry.name}
                      {entry.isCurrentUser && " (أنت)"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      المستوى {entry.level}
                    </p>
                  </div>
                </div>

                {/* Points */}
                <div className="text-left shrink-0">
                  <p className="font-bold text-foreground">
                    {entry.points.toLocaleString('ar-EG')}
                  </p>
                  <p className="text-xs text-muted-foreground">نقطة</p>
                </div>
              </div>
            )
          })}
        </div>

        {!compact && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-center text-muted-foreground">
              ترتيبك <span className="font-semibold text-primary">#٤</span> من أصل ١٥٦ طالب
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
