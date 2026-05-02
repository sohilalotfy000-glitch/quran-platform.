
import { getDashboardData } from "./actions";
import { BadgesCard } from "@/components/dashboard/badges-card";
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card";
import { TasksCard } from "@/components/dashboard/tasks-card"; // لو ملف المهام في مكان تاني عدلي السطر ده

export default async function HomePage() {
  // السطر ده هو السحر اللي بيجيب بيانات المتصدرين من قاعدة البيانات العالمية
  const { myTasks, leaderboard, currentUserId } = await getDashboardData();

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6" dir="rtl">
      
      {/* القسم الأول: البطاقات العلوية (7 أيام وغيرها) */}
      <BadgesCard />

      {/* القسم الثاني: المهام والمتصدرين */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* قسم المهام (بياخد مساحة أكبر) */}
        <div className="lg:col-span-2">
          {/* بنبعت المهام المحفوظة للملف عشان يعرضها */}
          <TasksCard initialTasks={myTasks} /> 
        </div>

        {/* قسم المتصدرين (هنا الكوبري اشتغل وبعتنا البيانات للوحة) */}
        <div className="lg:col-span-1">
          <LeaderboardCard entries={leaderboard} currentUserId={currentUserId} />
        </div>

      </div>
    </div>
  );
}
