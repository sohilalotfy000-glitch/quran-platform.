
// @ts-nocheck
"use server";
import { kv } from "@vercel/kv";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function saveProgress(tasks: any, totalXP: number) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) return;
    
    await kv.set(`tasks_${userId}`, tasks);
    await kv.hset("global_leaderboard", {
      [userId]: { name: user.firstName || "بطل", avatar: user.imageUrl || "", xp: totalXP }
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getDashboardData() {
  try {
    const { userId } = await auth();
    const myTasks = userId ? await kv.get(`tasks_${userId}`) : null;
    const allData = (await kv.hgetall("global_leaderboard")) || {};
    
    const leaderboard = Object.keys(allData).map(id => ({
      id,
      ...allData[id]
    })).sort((a, b) => b.xp - a.xp).slice(0, 10);

    return { myTasks, leaderboard, currentUserId: userId };
  } catch (e) {
    return { myTasks: null, leaderboard:


