// @ts-nocheck
"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"
import { saveProgress } from "@/app/actions"
import { useUser } from "@clerk/nextjs"

const lectureTasksData =[
  // المحاضرة الأولى
  { id: "l1_1", lectureGroup: "المحاضرة الأولى", title: "مراجعة 18 سورة", description: "تدريب ومراجعة حفظ 18 سورة", xp: 5, completed: false },
  { id: "l1_sun", lectureGroup: "المحاضرة الأولى", title: "تذكر الصور (الأحد)", description: "3 محاولات الصور يوم الأحد", xp: 5, completed: false },
  { id: "l1_mon", lectureGroup: "المحاضرة الأولى", title: "تذكر الصور (الإثنين)", description: "3 محاولات الصور يوم الإثنين", xp: 5, completed: false },
  { id: "l1_tue", lectureGroup: "المحاضرة الأولى", title: "تذكر الصور (الثلاثاء)", description: "3 محاولات الصور يوم الثلاثاء", xp: 5, completed: false },
  { id: "l1_3", lectureGroup: "المحاضرة الأولى", title: "تدبر 5 آيات", description: "تدبر 5 آيات", xp: 5, completed: false },

  // المحاضرة الثانية
  { id: "l2_wed", lectureGroup: "المحاضرة الثانية", title: "تذكر الصور (الأربعاء)", description: "3 محاولات على موقع ميموري ليج", xp: 5, completed: false },
  { id: "l2_listen", lectureGroup: "المحاضرة الثانية", title: "سماع + تفسير + تمهيد", description: "في 10 دقائق", xp: 5, completed: false },
  { id: "l2_memo", lectureGroup: "المحاضرة الثانية", title: "حفظ صفحة في القرآن", description: "في نصف ساعة", xp: 5, completed: false },
  { id: "l2_goal", lectureGroup: "المحاضرة الثانية", title: "تحديد الهدف", description: "تحديد الهدف وإرساله", xp: 5, completed: false },

  // المحاضرة الثالثة (المهام الجديدة)
  { id: "l3_1", lectureGroup: "المحاضرة الثالثة", title: "المؤقت الحلزوني", description: "طباعة وتنفيذ المؤقت الحلزوني", xp: 5, completed: false },
  { id: "l3_2", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة (الخميس)", description: "تهيئة الصفحة 7دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },
  { id: "l3_3", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة (الجمعة)", description: "تهيئة الصفحة 7دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },
  { id: "l3_4", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة (السبت)", description: "تهيئة الصفحة 7دقايق وحفظ الصفحة في اقل من نصف ساعة", xp: 5, completed: false },
  { id: "l3_5", lectureGroup: "المحاضرة الثالثة", title: "مراجعة أسماء السور", description: "مراجعة 39 اسماء سور القرآن بالترتيب", xp: 5, completed: false },
  { id: "l3_6", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (الخميس)", description: "3 محاولات ميموري ليج يوم الخميس", xp: 5, completed: false },
  { id: "l3_7", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (الجمعة)", description: "3 محاولات ميموري ليج يوم الجمعة", xp: 5, completed: false },
  { id: "l3_8", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (السبت)", description: "3 محاولات ميموري ليج يوم السبت", xp: 5, completed: false },

  // المحاضرة الرابعة (رجعناها زي ما كانت)
  { id: "l4_1", lectureGroup: "المحاضرة الرابعة", title: "قراءة سريعة", description: "4 مرات", xp: 5, completed: false },
  { id: "l4_2", lectureGroup: "المحاضرة الرابعة", title: "قراءة تصويرية", description: "7 مرات", xp: 5, completed: false },
  { id: "l4_3", lectureGroup: "المحاضرة الرابعة", title: "تهيئة الصفحة", description: "تهيئة", xp: 5, completed: false },
  { id: "l4_4", lectureGroup: "المحاضرة الرابعة", title: "تمارين العين", description: "تمارين", xp: 5, completed: false },
  { id: "l4_5", lectureGroup: "المحاضرة الرابعة", title: "حفظ صفحة", description: "في اقل من 20 دقيقة", xp: 5, completed: false }
];

export function TasksCard({ type }: { type: "daily" | "lecture" }) {
  const[tasks, setTasks] = useState(lectureTasksData);
  const [mounted, setMounted] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    setMounted(true);
    // غيرنا الذاكرة لـ v10
    const saved = localStorage.getItem("quran-tasks-final-v10");
    if (saved) setTasks(JSON.parse(saved));
  },[]);

  if (type === "daily" || !mounted) return null;

  const toggleTask = async (taskId: string) => {
    const newTasks = tasks.map((t: any) => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    localStorage.setItem("quran-tasks-final-v10", JSON.stringify(newTasks));
    
    if (isSignedIn && user) {
      const totalXP = newTasks.filter((t: any) => t.completed).reduce((acc: number, t: any) => acc + t.xp, 0);
      await saveProgress(newTasks, totalXP, user.id, user.firstName || "طالب", user.imageUrl || "");
    }
  };

  const completedCount = tasks.filter((t: any) => t.completed).length;
  const totalXP = tasks.filter((t: any) => t.completed).reduce((acc: number, t: any) => acc + t.xp, 0);

  const groupedTasks = tasks.reduce((acc: any, task: any) => {
    if (!acc[task.lectureGroup]) acc[task.lectureGroup] = [];
    acc[task.lectureGroup].push(task);
    return acc;
  }, {});

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
          {Object.entries(groupedTasks).map(([groupName, groupTasks]:[string, any]) => (
            <div key={groupName} className="space-y-3">
              <h3 className="font-bold text-emerald-600 border-b pb-2">{groupName}</h3>
              {groupTasks.map((task: any) => (
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
