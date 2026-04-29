"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap } from "lucide-react"

interface LevelCardProps {
  level: number
  currentXP: number
  requiredXP: number
  totalPoints: number
}

export function LevelCard({ level, currentXP, requiredXP, totalPoints }: LevelCardProps) {
  const progress = (currentXP / requiredXP) * 100

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-bl from-primary/90 to-primary">
      <CardContent className="p-6 text-primary-foreground">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm opacity-80 mb-1">المستوى الحالي</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{level}</span>
              <span className="text-lg font-medium opacity-80">حافظ</span>
            </div>
          </div>
          <div className="size-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <Zap className="size-7" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="opacity-80">التقدم نحو المستوى {level + 1}</span>
            <span className="font-semibold">{currentXP} / {requiredXP} نقطة</span>
          </div>
          <Progress
            value={progress}
            className="h-3 bg-primary-foreground/20 [&>div]:bg-primary-foreground"
          />
        </div>

        <div className="mt-6 pt-6 border-t border-primary-foreground/20">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-80">إجمالي النقاط</span>
            <span className="text-2xl font-bold">{totalPoints.toLocaleString('ar-EG')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
