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
  { id: "l3_8", lectureGroup: "المحاضرة الثالثة", title: "ميموري ليج (السبت)",
