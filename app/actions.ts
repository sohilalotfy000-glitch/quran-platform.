"use server";
import { kv } from "@vercel/kv";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function saveProgress(tasks: any, totalXP: number) {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) return;

  const name = user.firstName || "بطل القرآن";
  const avatar = user.imageUrl || "";

  // حفظ المهام الخاصة بالمتدرب
  await kv.set(`tasks_${userId}`, tasks);

  // حفظ النقط والاسم في لوحة المتصدرين العامة
  await kv.hset("global_leaderboard", {
    [userId]: { name, avatar, xp: totalXP }
  });
}

export async function getDashboardData() {
  const { userId } = await auth();
  let myTasks = null;
  
  if (userId) {
    myTasks = await kv.get(`tasks_${userId}`);
  }

  // جلب المتصدرين وترتيبهم من الأعلى للأقل
  const allData = await kv.hgetall("global_leaderboard") || {};
  const leaderboard = Object.keys(allData).map(id => ({
    id,
    ...(allData[id] as any)
  })).sort((a, b) => b.xp - a.xp).slice(0, 10); // بيعرض أول 10 متصدرين

  return { myTasks, leaderboard, currentUserId: userId };
}
