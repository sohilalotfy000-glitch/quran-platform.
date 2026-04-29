"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, ListTodo, Sparkles, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

type NavItem = "dashboard" | "tasks"

interface SidebarProps {
  activeNav: NavItem
  onNavChange: (nav: NavItem) => void
  isOpen: boolean
  onToggle: () => void
}

const navItems = [
  { id: "dashboard" as const, label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "tasks" as const, label: "المهام", icon: ListTodo },
]

export function Sidebar({ activeNav, onNavChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden bg-card shadow-lg"
        onClick={onToggle}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
              <Sparkles className="size-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold">تعلم القرآن</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavChange(item.id)
                    if (window.innerWidth < 1024) onToggle()
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-right",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/30"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto">
            <div className="bg-sidebar-accent rounded-xl p-4">
              <p className="text-sm font-medium mb-2">استمر في التقدم!</p>
              <p className="text-xs text-sidebar-foreground/70">
                أنت في سلسلة ٥ أيام متتالية! أكمل مهام اليوم للمحافظة على تقدمك.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
