"use server";
// @ts-nocheck
import { kv } from "@vercel/kv";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function saveProgress(tasks: any, totalXP: number) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) return;
    
    await kv.set(`tasks_${userId}`, tasks);
    await kv.hset("global_leaderboard", {
      [userId]: { 
        name: user.firstName || "طالب", 
        avatar: user.imageUrl || "", 
        xp: totalXP 
      }
    });
    revalidatePath("/");
  } catch (e) {
    console.log("error");
  }
}

export async function getDashboardData() {
  const defaultUsers =[
    { id: "fake1", name: "أحمد محمد", xp: 120, avatar: "" },
    { id: "fake2", name: "فاطمة علي", xp: 95, avatar: "" },
    { id: "fake3", name: "محمد خالد", xp: 80, avatar: "" }
  ];

  try {
    const { userId } = await auth();
    let myTasks = null;
    if (userId) {
      myTasks = await kv.get(`tasks_${userId}`);
    }
    
    const allData = (await kv.hgetall("global_leaderboard")) || {};
    
    let leaderboard = Object.keys(allData).map(id => ({
      id,
      ...(allData[id] as any)
    }));

    // إضافة النماذج الأساسية عشان اللوحة متبقاش فاضية
    defaultUsers.forEach(du => {
      if (!leaderboard.find(u => u.id === du.id)) {
        leaderboard.push(du);
      }
    });

    leaderboard = leaderboard.sort((a, b) => b.xp - a.xp).slice(0, 10);

    return { myTasks, leaderboard, currentUserId: userId };
  } catch (e) {
    return { myTasks: null, leaderboard: defaultUsers, currentUserId: null };
  }
}
