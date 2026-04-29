
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

// المهام اليومية التراكمية
const initialDailyTasks: Task[] =[
  {
    id: "d1",
    title: "تمارين العين",
    description: "تدريب العين يومياً لزيادة سرعة القراءة",
    xp: 20,
    completed: false,
  },
  {
    id: "d2",
    title: "موقع ميموري ليج",
    description: "تدريب الذاكرة اليومي",
    xp: 30,
    completed: false,
  }
]

// مهام المحاضرات
const initialLectureTasks: Task[] =[
  // المحاضرة الأولى
  {
    id: "l1_1",
    title: "مراجعة 18 سورة",
    description: "تدريب ومراجعة حفظ 18 سورة بالترتيب (المحاضرة الأولى)",
    xp: 50,
    completed: false,
  },
  {
    id: "l1_2",
    title: "ميموري ليج (تذكر الصور)",
    description: "لعب 3 محاولات على تذكر الصور (المحاضرة الأولى)",
    xp: 30,
    completed: false,
  },
  {
    id: "l1_3",
    title: "تدبر 5 آيات",
    description: "قراءة وتدبر 5 آيات من الورد (المحاضرة الأولى)",
    xp: 40,
    completed: false,
  },
  // المحاضرة الثانية
  {
    id: "l2_1",
    title: "تحديد الهدف والمقاومة",
    description: "كتابة الهدف ومتابعة المقاومة (المحاضرة الثانية)",
    xp: 30,
    completed: false,
  },
  {
    id: "l2_2",
    title: "تهيئة الصفحة (5 دقائق)",
    description: "تمهيد وتهيئة الصفحة قبل الحفظ (المحاضرة الثانية)",
    xp: 20,
    completed: false,
  },
  {
    id: "l2_3",
    title: "الاستدعاء النشط",
    description: "التدرب على مهارة الاستدعاء النشط (المحاضرة الثانية)",
    xp: 40,
    completed: false,
  },
  {
    id: "l2_4",
    title: "المؤقت الحلزوني",
    description: "استخدام المؤقت لمراقبة الوقت (المحاضرة الثانية)",
    xp: 20,
    completed: false,
  },
  // المحاضرة الثالثة
  {
    id: "l3_1",
    title: "حفظ صفحة في نصف ساعة",
    description: "تطبيق عملي لحفظ الصفحة (المحاضرة الثالثة)",
    xp: 100,
    completed: false,
  },
  {
    id: "l3_2",
    title: "تمارين التركيز (بومودورو)",
    description: "تطبيق تقنية بومودورو والعد التنازلي وورقة المشتتات (المحاضرة الثالثة)",
    xp: 50,
    completed: false,
  }
]

interface TasksCardProps {
  type: "daily" | "lecture"
}

export function TasksCard({ type }: TasksCardProps) {
  const [dailyTasks, setDailyTasks] = useState<Task[]>(initialDailyTasks)
  const [lectureTasks, setLectureTasks] = useState<Task
