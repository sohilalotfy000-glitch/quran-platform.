"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

interface Task { id: string; title: string; description: string; xp: number; completed: boolean; }

const initialDailyTasks: Task[] =[
  { id: "d1", title: "تمارين العين", description: "تدريب لزيادة سرعة القراءة", xp: 20, completed: false },
  { id: "d2", title: "موقع ميموري ليج", description: "تدريب الذاكرة", xp: 30, completed: false }
];

const initialLectureTasks: Task[] =[
  { id: "l1", title: "مراجعة 18 سورة", description: "المحاضرة الأولى", xp: 50, completed: false },
  { id: "l2", title: "تذكر الصور", description: "لعب 3 محاولات ميموري ليج", xp: 30, completed: false },
  { id: "l3", title: "تدبر 5 آيات", description: "المحاضرة الأولى", xp: 40, completed: false },
  { id: "l4", title: "تحديد الهدف والمقاومة", description: "المحاضرة الثانية", xp: 30, completed: false },
  { id: "l5", title: "تهيئة الصفحة", description: "5 دقائق", xp: 20, completed: false },
  { id: "l6", title: "الاستدعاء النشط", description: "المحاضرة الثانية", xp: 40, completed: false },
  { id: "l7", title: "حفظ في نصف ساعة", description: "المحاضرة الثالثة", xp: 100, completed: false }
];

export function TasksCard({ type }: { type: "daily" | "lecture" }) {
  const [tasks, setTasks] = useState(type === "daily" ? initialDailyTasks : initialLectureTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalXP = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0);

  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {type === "daily" ? "المهام اليومية" : "مهام المحاضرات"}
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="border-0 bg-secondary/20 text-secondary-foreground">{completedCount}/{tasks.length} مكتمل</Badge>
            <Badge className="border-0 bg-accent/20 text-accent-foreground">+{totalXP} نقطة</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${task.completed ? "bg-secondary/10 border-secondary/30" : "bg-card hover:bg-muted/50 border-border"}`} onClick={() => toggleTask(task.id)}>
              <button className={task.completed ? "text-secondary" : "text-muted-foreground"}>
                {task.completed ? <CheckCircle2 className="size-6" /> : <Circle className="size-6" />}
              </button>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium mb-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{task.description}</p>
              </div>
              <Badge className={task.completed ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}>+{task.xp} نقطة</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
