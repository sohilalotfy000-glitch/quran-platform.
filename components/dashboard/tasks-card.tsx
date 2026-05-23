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

  // المحاضرة الثالثة
  { id: "l3_1", lectureGroup: "المحاضرة الثالثة", title: "المؤقت الحلزوني", description: "طباعة وتنفيذ المؤقت الحلزوني", xp: 5, completed: false },
  { id: "l3_2", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة (الخميس)", description: "تهيئة الصفحة 7دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },
  { id: "l3_3", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة (الجمعة)", description: "تهيئة الصفحة 7دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },
  { id: "l3_4", lectureGroup: "المحاضرة الثالثة", title: "حفظ الصفحة (السبت)", description: "تهيئة الصفحة 7دقايق وحفظ الصفحة في اقل من نصف ساعة", xp: 5, completed: false },
  { id: "l3_5", lectureGroup: "المحاضرة الثالثة", title: "مراجعة أسماء السور", description: "مراجعة 39 اسماء سور القرآن بالترتيب", xp: 5, completed: false },
  { id: "l3_6", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (الخميس)", description: "3 محاولات ميموري ليج يوم الخميس", xp: 5, completed: false },
  { id: "l3_7", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (الجمعة)", description: "3 محاولات ميموري ليج يوم الجمعة", xp: 5, completed: false },
  { id: "l3_8", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (السبت)", description: "3 محاولات ميموري ليج يوم السبت", xp: 5, completed: false },

  // المحاضرة الرابعة
  { id: "l4_eye_sun", lectureGroup: "المحاضرة الرابعة", title: "تمارين العين (الأحد)", description: "تمارين العين 5 دقائق يوم الأحد", xp: 5, completed: false },
  { id: "l4_eye_mon", lectureGroup: "المحاضرة الرابعة", title: "تمارين العين (الإثنين)", description: "تمارين العين 5 دقائق يوم الإثنين", xp: 5, completed: false },
  { id: "l4_eye_tue", lectureGroup: "المحاضرة الرابعة", title: "تمارين العين (الثلاثاء)", description: "تمارين العين 5 دقائق يوم الثلاثاء", xp: 5, completed: false },
  { id: "l4_read_sun", lectureGroup: "المحاضرة الرابعة", title: "قراءة سريعة (الأحد)", description: "عشر دقائق قراءة سريعة يوم الأحد", xp: 5, completed: false },
  { id: "l4_read_mon", lectureGroup: "المحاضرة الرابعة", title: "قراءة سريعة (الإثنين)", description: "عشر دقائق قراءة سريعة يوم الإثنين", xp: 5, completed: false },
  { id: "l4_read_tue", lectureGroup: "المحاضرة الرابعة", title: "قراءة سريعة (الثلاثاء)", description: "عشر دقائق قراءة سريعة يوم الثلاثاء", xp: 5, completed: false },
  { id: "l4_memo_sun", lectureGroup: "المحاضرة الرابعة", title: "تهيئة وحفظ (الأحد)", description: "تهيئة 5 دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },
  { id: "l4_memo_mon", lectureGroup: "المحاضرة الرابعة", title: "تهيئة وحفظ (الإثنين)", description: "تهيئة 5 دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },
  { id: "l4_memo_tue", lectureGroup: "المحاضرة الرابعة", title: "تهيئة وحفظ (الثلاثاء)", description: "تهيئة 5 دقايق وحفظ الصفحة في نصف ساعة", xp: 5, completed: false },

  // المحاضرة الخامسة
  { id: "l5_1", lectureGroup: "المحاضرة الخامسة", title: "تمارين العين", description: "تمارين العين", xp: 5, completed: false },
  { id: "l5_2", lectureGroup: "المحاضرة الخامسة", title: "قراءة سريعة (4 مرات)", description: "اربع مرات قراءة سريعة لمدة 10 دقائق", xp: 5, completed: false },
  { id: "l5_3", lectureGroup: "المحاضرة الخامسة", title: "قراءة تصويرية (7 مرات)", description: "سبع مرات قراءة تصويرية لمدة 10 دقائق", xp: 5, completed: false },
  { id: "l5_4", lectureGroup: "المحاضرة الخامسة", title: "سماع وتهيئة", description: "سماع شيخ تفسير وتهيئة", xp: 5, completed: false },
  { id: "l5_5", lectureGroup: "المحاضرة الخامسة", title: "حفظ صفحة القرآن", description: "حفظ صفحة القرآن في 20 دقيقة", xp: 5, completed: false },
  { id: "l5_6", lectureGroup: "المحاضرة الخامسة", title: "مراجعة الشهور", description: "مراجعة الشهور الهجرية", xp: 5, completed: false },

  // المحاضرة السادسة
  { id: "l6_1", lectureGroup: "المحاضرة السادسة", title: "قراءة سريعة (4 مرات)", description: "اربع مرات قراءة سريعة لمدة عشر دقائق", xp: 5, completed: false },
  { id: "l6_2", lectureGroup: "المحاضرة السادسة", title: "قراءة تصويرية (7 مرات)", description: "سبع مرات قراءة تصويرية لمدة عشر دقائق", xp: 5, completed: false },
  { id: "l6_3", lectureGroup: "المحاضرة السادسة", title: "خريطة ذهنية (الخميس)", description: "خريطة ذهنية لوجه يوم الخميس", xp: 5, completed: false },
  { id: "l6_4", lectureGroup: "المحاضرة السادسة", title: "خريطة ذهنية (الجمعة)", description: "خريطة ذهنية لوجه يوم الجمعة", xp: 5, completed: false },
  { id: "l6_5", lectureGroup: "المحاضرة السادسة", title: "حفظ وجه (الخميس)", description: "حفظ وجه في 20 دقيقة يوم الخميس", xp: 5, completed: false },
  { id: "l6_6", lectureGroup: "المحاضرة السادسة", title: "حفظ وجه (الجمعة)", description: "حفظ وجه 20 دقيقة يوم الجمعة", xp: 5, completed: false },
  { id: "l6_7", lectureGroup: "المحاضرة السادسة", title: "حفظ وجه (السبت)", description: "حفظ وجه 20 دقيقة يوم السبت", xp: 5, completed: false },

  // المحاضرة السابعة
  { id: "l7_1", lectureGroup: "المحاضرة السابعة", title: "قراءة تصويرية (7 مرات)", description: "قراءة تصويرية 7 مرات لمدة 10 دقائق", xp: 5, completed: false },
  { id: "l7_2", lectureGroup: "المحاضرة السابعة", title: "حفظ وجه (الإثنين)", description: "حفظ الوجه في اقل من 20 دقيقة يوم الاتنين", xp: 5, completed: false },
  { id: "l7_3", lectureGroup: "المحاضرة السابعة", title: "حفظ وجه (الثلاثاء)", description: "حفظ الوجه في 20 دقيقة يوم الثلاث", xp: 5, completed: false },
  { id: "l7_4", lectureGroup: "المحاضرة السابعة", title: "قصر الذاكرة (100 مكان)", description: "عمل قصر ذاكرة خاص بكم متكون من 100 مكان", xp: 5, completed: false },
  { id: "l7_5", lectureGroup: "المحاضرة السابعة", title: "تطبيق قصر الذاكرة", description: "تطبيق قصر الذاكرة على الوجه المحفوظ", xp: 5, completed: false },

  // المحاضرة الثامنة
  { id: "l8_1", lectureGroup: "المحاضرة الثامنة", title: "قراءة تصويرية (7 مرات)", description: "سبع مرات قراءة تصويرية لمدة 10 دقائق", xp: 5, completed: false },
  { id: "l8_2", lectureGroup: "المحاضرة الثامنة", title: "تهيئة وتصنيف الصفحة", description: "تهيئة الصفحة وتصنيفها في 5 دقائق", xp: 5, completed: false },
  { id: "l8_3", lectureGroup: "المحاضرة الثامنة", title: "تدبر 3 آيات (جورنال)", description: "تدبر 3 ايات بطريقة القرآن جورنال", xp: 5, completed: false },
  { id: "l8_4", lectureGroup: "المحاضرة الثامنة", title: "حفظ صفحة", description: "حفظ صفحة من القرآن في ربع ساعة", xp: 5, completed: false },

  // المحاضرة التاسعة
  { id: "l9_1", lectureGroup: "المحاضرة التاسعة", title: "تنزيل تطبيق Anki", description: "تنزيل ابليكشن anki", xp: 5, completed: false },
  { id: "l9_2", lectureGroup: "المحاضرة التاسعة", title: "إضافة المراجعات", description: "اضافة المراجعات وارسال سكرين شوت على الجروب", xp: 5, completed: false },

  // المحاضرة العاشرة (المهام الجديدة)
  { id: "l10_1", lectureGroup: "المحاضرة العاشرة", title: "قراءة سريعة (4 مرات)", description: "4 مرات قراءة سريعة 10 دقائق", xp: 5, completed: false },
  { id: "l10_2", lectureGroup: "المحاضرة العاشرة", title: "قراءة تصويرية (7 مرات)", description: "7 مرات قراءة تصويرية كل يوم 10 دقائق", xp: 5, completed: false },
  { id: "l10_3", lectureGroup: "المحاضرة العاشرة", title: "سماع وتفسير وتهيئة", description: "اسمع الصفحة من شيخ + التفسير + التهيئة", xp: 5, completed: false },
  { id: "l10_4", lectureGroup: "المحاضرة العاشرة", title: "حفظ صفحة", description: "حفظ صفحة من القرآن في 10 دقائق", xp: 5, completed: false }
];

export function TasksCard({ type }: { type: "daily" | "lecture" }) {
  const [tasks, setTasks] = useState(lectureTasksData);
  const [mounted, setMounted] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    setMounted(true);
    // حدثنا اسم الذاكرة لـ v17 عشان الكل يشوف الجديد فوراً
    const saved = localStorage.getItem("quran-tasks-final-v17");
    if (saved) setTasks(JSON.parse(saved));
  },[]);

  if (type === "daily" || !mounted) return null;

  const toggleTask = async (taskId: string) => {
    const newTasks = tasks.map((t: any) => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    localStorage.setItem("quran-tasks-final-v17", JSON.stringify(newTasks));
    
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
