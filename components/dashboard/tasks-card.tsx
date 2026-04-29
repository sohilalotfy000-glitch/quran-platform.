"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, Sparkles, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
  dueTime?: string
}

const initialDailyTasks: Task[] = [
  {
    id: "1",
    title: "حفظ صفحة من القرآن الكريم",
    description: "حفظ صفحة جديدة من سورة البقرة",
    xp: 50,
    completed: false,
    dueTime: "٢:٠٠ م"
  },
  {
    id: "2",
    title: "مراجعة الحفظ السابق",
    description: "مراجعة آخر ٥ صفحات محفوظة",
    xp: 30,
    completed: false,
    dueTime: "٤:٠٠ م"
  },
  {
    id: "3",
    title: "الاستماع للتلاوة",
    description: "الاستماع لتلاوة الشيخ المنشاوي",
    xp: 25,
    completed: true
  }
]

const initialLectureTasks: Task[] = [
  {
    id: "l1",
    title: "تطبيق أحكام التجويد للمحاضرة الأولى",
    description: "تطبيق أحكام النون الساكنة والتنوين",
    xp: 100,
    completed: false,
    dueTime: "٦:٠٠ م"
  },
  {
    id: "l2",
    title: "اختبار المحاضرة الثانية",
    description: "اختبار قصير عن أحكام الميم الساكنة",
    xp: 75,
    completed: false,
    dueTime: "٨:٠٠ م"
  }
]

interface TasksCardProps {
  type: "daily" | "lecture"
}

export function TasksCard({ type }: TasksCardProps) {
  const [dailyTasks, setDailyTasks] = useState<Task[]>(initialDailyTasks)
  const [lectureTasks, setLectureTasks] = useState<Task[]>(initialLectureTasks)

  const tasks = type === "daily" ? dailyTasks : lectureTasks
  const setTasks = type === "daily" ? setDailyTasks : setLectureTasks

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const completedCount = tasks.filter(t => t.completed).length
  const totalXP = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0)

  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              {type === "daily" ? (
                <Sparkles className="size-5 text-secondary" />
              ) : (
                <GraduationCap className="size-5 text-primary" />
              )}
              {type === "daily" ? "المهام اليومية" : "مهام المحاضرات"}
            </CardTitle>
            {type === "lecture" && (
              <p className="text-sm text-muted-foreground mt-1">
                كل محاضرة لها مهام مخصصة
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground border-0">
              {completedCount}/{tasks.length} مكتمل
            </Badge>
            <Badge className="bg-accent/20 text-accent-foreground border-0">
              +{totalXP} نقطة
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                task.completed
                  ? "bg-secondary/10 border-secondary/30"
                  : "bg-card hover:bg-muted/50 border-border"
              )}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "shrink-0 transition-colors",
                  task.completed ? "text-secondary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {task.completed ? (
                  <CheckCircle2 className="size-6" />
                ) : (
                  <Circle className="size-6" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    "font-medium mb-1",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {task.description}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-4 shrink-0">
                {task.dueTime && !task.completed && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {task.dueTime}
                  </span>
                )}
                <Badge
                  className={cn(
                    "font-semibold",
                    task.completed
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  +{task.xp} نقطة
                </Badge>
              </div>

              {!task.completed && (
                <Button
                  size="sm"
                  onClick={() => toggleTask(task.id)}
                  className="shrink-0 bg-primary hover:bg-primary/90"
                >
                  تم الإنجاز
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
