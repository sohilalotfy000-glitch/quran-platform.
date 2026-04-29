"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Flame, Target, Clock, BookOpen } from "lucide-react"

interface Stat {
  label: string
  value: string | number
  icon: React.ElementType
  color: string
  bgColor: string
}

const stats: Stat[] = [
  {
    label: "أيام متتالية",
    value: "٥ أيام",
    icon: Flame,
    color: "text-chart-4",
    bgColor: "bg-chart-4/15"
  },
  {
    label: "مهام مكتملة",
    value: "٤٢",
    icon: Target,
    color: "text-secondary",
    bgColor: "bg-secondary/15"
  },
  {
    label: "ساعات التعلم",
    value: "١٨.٥ س",
    icon: Clock,
    color: "text-chart-5",
    bgColor: "bg-chart-5/15"
  },
  {
    label: "صفحات محفوظة",
    value: "١٢",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/15"
  }
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`size-11 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center shrink-0`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
