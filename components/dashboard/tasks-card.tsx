
"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"
import { saveProgress, getDashboardData } from "@/app/actions"
import { useUser } from "@clerk/nextjs"

interface Task { id: string; title: string; description: string; xp: number; completed: boolean; lectureGroup: string; }

const lectureTasksData: Task[] =[
  { id: "l1_1", lectureGroup: "المحاضرة الأولى", title: "مراجعة 18 سورة", description: "تدريب ومراجعة حفظ 18 سورة بالترتيب", xp: 5, completed: false },
  { id: "l1_2", lectureGroup: "المحاضرة الأولى", title: "تذكر الصور", description: "3 محاولات على موقع ميموري ليج", xp: 5, completed: false },
  { id: "l1_3", lectureGroup: "المحاضرة الأولى", title: "تدبر 5 آيات", description: "تدبر 5 آيات", xp: 5, completed: false },

  { id: "l2_1", lectureGroup: "المحاضرة الثانية", title: "تحديد الهدف والمقاومة", description: "تحديد الهدف والمقاومة", xp: 5, completed: false },
  { id: "l2_2", lectureGroup: "المحاضرة الثانية", title: "الاستدعاء النشط", description: "التدرب على الاستدعاء النشط", xp: 5, completed: false },
  { id: "l2_3", lectureGroup: "المحاضرة الثانية", title: "تمهيد الصفحة", description: "تمهيد صفحة في 10 دقايق", xp: 5, completed: false },
  { id: "l2_4", lectureGroup: "المحاضرة الثانية", title: "المؤقت الحلزوني", description: "المؤقت الحلزوني لمراقبة الوقت", xp: 5, completed: false },

  { id: "l3_1", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة في نصف ساعة", description: "تطبيق على حفظ الصفحة في اقل من نصف ساعة", xp: 5, completed: false },
  { id: "l3_2", lectureGroup: "المحاضرة الثالثة", title: "تهيئة الصفحة والسماع", description: "تهيئة الصفحة وسماع في 7 دقائق", xp: 5, completed: false },
  { id: "l3_3", lectureGroup: "المحاضرة الثالثة", title: "تمارين التركيز", description: "بومودورو، العد التنازلي، وورقة المشتتات", xp: 5, completed: false },

  { id: "l4_1", lectureGroup: "المحاضرة الرابعة", title: "القراءة السريعة", description: "4 مرات قراءة سريعة", xp: 5, completed: false },
  { id: "l4_2", lectureGroup: "المحاضرة الرابعة", title: "القراءة التصويرية", description: "7 مرات قراءة تصويرية", xp: 5, completed: false },
  { id: "l4_3", lectureGroup: "المحاضرة الرابعة", title: "تهيئة الصفحة", description: "تهيئة الصفحة", xp: 5, completed: false },
  { id: "l4_4", lectureGroup: "المحاضرة الرابعة", title: "تمارين العين", description: "تمارين العين", xp: 5, completed: false },
  { id: "l4_5", lectureGroup: "المحاضرة الرابعة", title: "حفظ صفحة", description: "حفظ صفحة في اقل من 20 دقيقة", xp: 5, completed: false }
];

export function TasksCard({ type }: { type: "daily" | "lecture" }) {
  const [tasks, setTasks] = useState<Task[]>(lectureTasksData);
  const { isSignedIn } = useUser();

  // بيجيب البيانات من الخزنة الحقيقية
  useEffect(() => {
    if (isSignedIn) {
      getDashboardData().then((data) => {
        if (data && data.myTasks) setTasks(data.myTasks);
      });
    }
  }, [isSignedIn]);

  if (type === "daily") return null;

  const toggleTask = (taskId: string) => {
    const newTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    
    // حساب النقط والحفظ في الخزنة الحقيقية
    const newTotalXP = newTasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0);
    if (isSignedIn) {
      saveProgress(newTasks, newTotalXP);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalXP = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0);

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.lectureGroup]) acc[task.lectureGroup] =[];
    acc[task.lectureGroup].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">مهام المحاضرات</CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="border-0 bg-secondary/20 text-secondary-foreground">{completedCount}/{tasks.length} مكتمل</Badge>
            <Badge className="border-0 bg-accent/20 text-accent-foreground">+{totalXP} نقطة</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
            <div key={groupName} className="space-y-3">
              <h3 className="font-bold text-primary border-b pb-2">{groupName}</h3>
              {groupTasks.map((task) => (
                <div key={task.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${task.completed ? "bg-secondary/10 border-secondary/30" : "bg-card hover:bg-muted/50 border-border"}`} onClick={() => toggleTask(task.id)}>
                  <button className={task.completed ? "text-secondary" : "text-muted-foreground"}>
                    {task.completed ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm mb-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{task.description}</p>
                  </div>
                  <Badge className={task.completed ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}>+{task.xp} نقطة</Badge>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
