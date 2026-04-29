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

const initialDailyTasks: Task[] =[
  { id: "d1", title: "تمارين العين", description: "تدريب العين يومياً لزيادة سرعة القراءة", xp: 20, completed: false },
  { id: "d2", title: "موقع ميموري ليج", description: "تدريب الذاكرة اليومي", xp: 30, completed: false }
]

const initialLectureTasks: Task[] =[
  { id: "l1_1", title: "مراجعة 18 سورة", description: "المحاضرة الأولى: تدريب ومراجعة حفظ 18 سورة بالترتيب", xp: 50, completed: false },
  { id: "l1_2", title: "ميموري ليج (تذكر الصور)", description: "المحاضرة الأولى: لعب 3 محاولات", xp: 30, completed: false },
  { id: "l1_3", title: "تدبر 5 آيات", description: "المحاضرة الأولى: قراءة وتدبر 5 آيات", xp: 40, completed: false },
  { id: "l2_1", title: "تحديد الهدف والمقاومة", description: "المحاضرة الثانية: كتابة الهدف ومتابعة المقاومة", xp: 30, completed: false },
  { id: "l2_2", title: "تهيئة الصفحة", description: "المحاضرة الثانية: تمهيد وتهيئة الصفحة (5 دقائق)", xp: 20, completed: false },
  { id: "l2_3", title: "الاستدعاء النشط", description: "المحاضرة الثانية: التدرب على الاستدعاء النشط", xp: 40, completed: false },
  { id: "l3_1", title: "حفظ صفحة في نصف ساعة", description: "المحاضرة الثالثة: تطبيق عملي لحفظ الصفحة", xp: 100, completed: false },
  { id: "l3_2", title: "تمارين التركيز (بومودورو)", description: "المحاضرة الثالثة: تطبيق تقنية بومودورو", xp: 50, completed: false }
]

interface TasksCardProps {
  type: "daily" | "lecture"
}

export function TasksCard({ type }: TasksCardProps) {
  const[dailyTasks, setDailyTasks] = useState<Task[]>(initialDailyTasks)
  const[lectureTasks, setLectureTasks] = useState<Task
