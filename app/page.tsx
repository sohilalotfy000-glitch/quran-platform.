"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { LevelCard } from "@/components/dashboard/level-card"
import { BadgesCard } from "@/components/dashboard/badges-card"
import { TasksCard } from "@/components/dashboard/tasks-card"
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type NavItem = "dashboard" | "tasks"

export default function LearningDashboard() {
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-row-reverse">
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 lg:mr-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute top-1 left-1 size-2 bg-destructive rounded-full" />
              </Button>
              <Avatar className="size-10 border-2 border-primary/30">
                <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="المستخدم" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">عم</AvatarFallback>
              </Avatar>
            </div>
            <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
            <div className="hidden lg:block text-left">
              <h1 className="text-2xl font-bold text-foreground">
                {activeNav === "dashboard" && "أهلا بك، يا صاحب القرآن!"}
                {activeNav === "tasks" && "المهام"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {activeNav === "dashboard" && "هل أنت مستعد لمواصلة رحلة التعلم؟"}
                {activeNav === "tasks" && "أكمل المهام لكسب النقاط والارتقاء بمستواك"}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Mobile title */}
          <div className="lg:hidden mb-6 mt-8 text-right">
            <h1 className="text-2xl font-bold text-foreground">
              {activeNav === "dashboard" && "أهلا بك، برمج ذاكرتك بالقرآن!"}
              {activeNav === "tasks" && "المهام"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeNav === "dashboard" && "هل أنت مستعد لمواصلة رحلة التعلم؟"}
              {activeNav === "tasks" && "أكمل المهام لكسب النقاط والارتقاء بمستواك"}
            </p>
          </div>

          {activeNav === "dashboard" && (
            <div className="space-y-6">
              {/* Level and Stats Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <LevelCard
                    level={18}
                    currentXP={650}
                    requiredXP={1000}
                    totalPoints={8750}
                  />
                </div>
                <div className="lg:col-span-2">
                  <StatsGrid />
                </div>
              </div>

              {/* Badges */}
              <BadgesCard />

              {/* Daily Tasks and Lecture Tasks */}
              <div className="grid lg:grid-cols-2 gap-6">
                <TasksCard type="daily" />
                <TasksCard type="lecture" />
              </div>

              {/* Leaderboard */}
              <LeaderboardCard />
            </div>
          )}

          {activeNav === "tasks" && (
            <div className="space-y-6">
              <TasksCard type="daily" />
              <TasksCard type="lecture" />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
