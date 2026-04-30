"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"
import { saveProgress } from "@/app/actions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface Task { id: string; title: string; description: string; xp: number; completed: boolean; lectureGroup: string; }

const lectureTasksData: Task[] =[
  { id: "l1_1", lectureGroup: "المحاضرة الأولى", title: "مراجعة 18 سورة", description: "تدريب ومراجعة حفظ 18 سورة", xp: 5, completed: false },
  { id: "l1_2", lectureGroup: "المحاضرة الأولى", title: "تذكر الصور", description: "3 محاولات ميموري ليج", xp: 5, completed: false },
  { id: "l1_3", lectureGroup: "المحاضرة الأولى", title: "تدبر 5 آيات", description: "تدبر 5 آيات", xp: 5, completed: false },
  { id: "l2_1", lectureGroup: "المحاضرة الثانية", title: "تحديد الهدف", description: "تحديد الهدف والمقاومة", xp: 5, completed: false },
  { id: "l2_2", lectureGroup: "المحاضرة الثانية", title: "الاستدعاء النشط", description: "التدرب على الاستدعاء", xp: 5, completed: false },
  { id: "l2_3", lectureGroup: "المحاضرة الثانية", title: "تمهيد الصفحة", description: "10 دقايق", xp: 5, completed: false },
  { id: "l2_4", lectureGroup: "المحاضرة الثانية", title: "المؤقت الحلزوني", description: "مراقبة الوقت", xp: 5, completed: false },
  { id: "l3_1", lectureGroup: "المحاضرة الثالثة", title: "حفظ في نصف ساعة", description: "حفظ الصفحة", xp: 5, completed: false },
  { id: "l3_2", lectureGroup: "المحاضرة الثالثة", title: "تهيئة وسماع", description: "7 دقائق", xp: 5, completed: false },
  { id: "l3_3", lectureGroup: "المحاضرة الثالثة", title: "تمارين التركيز", description: "بومودورو وعد تنازلي", xp: 5, completed: false },
  { id: "l4_1", lectureGroup: "المحاضرة الرابعة", title: "قراءة سريعة", description: "4 مرات", xp: 5, completed: false },
  { id: "l4_2", lectureGroup: "المحاضرة الرابعة", title: "قراءة تصويرية", description: "7 مرات", xp: 5, completed: false },
  { id: "l4_3", lectureGroup: "المحاضرة الرابعة", title: "تهيئة الصفحة", description: "تهيئة", xp: 5, completed: false },
  { id: "l4_4", lectureGroup: "المحاضرة الرابعة", title: "تمارين العين", description: "تمارين", xp: 5, completed: false },
  { id: "l4_5", lectureGroup: "المحاضرة الرابعة", title: "حفظ صفحة", description: "في اقل من 20 دقيقة", xp: 5, completed: false }
];

export function TasksCard({ type }: { type: "daily" | "lecture" }) {
  const [tasks, setTasks] = useState<Task[]>(lectureTasksData);
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("quran-tasks-save-v4");
    if (saved) setTasks(JSON.parse(saved));
  },[]);

  if (type === "daily" || !mounted) return null;

  const toggleTask = async (taskId: string) => {
    const newTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    localStorage.setItem("quran-tasks-save-v4", JSON.stringify(newTasks));
    
    if (isSignedIn) {
      const totalXP = newTasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0);
      await saveProgress(newTasks, totalXP);
      router.refresh(); // بيحدث المتصدرين فوراً
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalXP = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0);

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.lectureGroup]) acc[task.lectureGroup] = [];
    acc[task.lectureGroup].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg font-bold">مهام المحاضرات</CardTitle>
          <div className="flex gap-3">
            <Badge variant="secondary">{completedCount}/{tasks.length} مكتمل</Badge>
            <Badge className="bg-emerald-500/20 text-emerald-700">+{totalXP} نقطة</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
            <div key={groupName} className="space-y-3">
              <h3 className="font-bold text-emerald-600 border-b pb-2">{groupName}</h3>
              {groupTasks.map((task) => (
                <div key={task.id} className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-colors ${task.completed ? "bg-emerald-50 border-emerald-200" : "bg-card hover:bg-slate-50"}`} onClick={() => toggleTask(task.id)}>
                  <button className={task.completed ? "text-emerald-500" : "text-slate-300"}>
                    {task.completed ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm mb-1 ${task.completed ? "line-through text-slate-500" : "text-slate-700"}`}>{task.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{task.description}</p>
                  </div>
                  <Badge variant="outline" className={task.completed ? "bg-emerald-500 text-white border-0" : "text-slate-400"}>+{task.xp}</Badge>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
