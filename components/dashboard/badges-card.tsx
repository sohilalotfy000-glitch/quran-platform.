"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Brain, Flame, Star, Target } from "lucide-react"

interface Badge {
  id: string
  name: string
  icon: React.ElementType
  color: string
  bgColor: string
  earnedAt: string
}

interface BadgesCardProps {
  badges?: Badge[]
}

const defaultBadges: Badge[] = [
  {
    id: "1",
    name: "متعلم سريع",
    icon: Brain,
    color: "text-chart-1",
    bgColor: "bg-chart-1/15",
    earnedAt: "منذ يومين"
  },
  {
    id: "2",
    name: "محب القراءة",
    icon: BookOpen,
    color: "text-chart-2",
    bgColor: "bg-chart-2/15",
    earnedAt: "منذ ٥ أيام"
  },
  {
    id: "3",
    name: "مثابر",
    icon: Flame,
    color: "text-chart-4",
    bgColor: "bg-chart-4/15",
    earnedAt: "منذ أسبوع"
  },
  {
    id: "4",
    name: "منجز",
    icon: Target,
    color: "text-chart-3",
    bgColor: "bg-chart-3/15",
    earnedAt: "منذ أسبوعين"
  },
  {
    id: "5",
    name: "نجم صاعد",
    icon: Star,
    color: "text-accent",
    bgColor: "bg-accent/15",
    earnedAt: "منذ ٣ أسابيع"
  },
  {
    id: "6",
    name: "بطل",
    icon: Award,
    color: "text-primary",
    bgColor: "bg-primary/15",
    earnedAt: "منذ شهر"
  },
]

export function BadgesCard({ badges = defaultBadges }: BadgesCardProps) {
  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="size-5 text-accent" />
          أحدث الأوسمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.id}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div
                  className={`size-12 rounded-xl ${badge.bgColor} ${badge.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <Icon className="size-6" />
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                  {badge.name}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
