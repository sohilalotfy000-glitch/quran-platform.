
"use server";
// @ts-nocheck
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function saveProgress(tasks: any, totalXP: number, uId: string, uName: string, uPic: string) {
  if (!uId) return;
  try {
    // بيحفظ مهامك
    await kv.set(`tasks_${uId}`, tasks);
    // بيحفظ اسمك ونقطك في لوحة المتصدرين
    await kv.hset("global_leaderboard", {
      [uId]: { name: uName || "طالب", avatar: uPic || "", xp: totalXP }
    });
    // بيحدث الموقع للكل
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
}

export async function getDashboardData() {
  try {
    const allData = (await kv.hgetall("global_leaderboard")) || {};
    const leaderboard = Object.keys(allData).map(id => ({
      id,
      ...(allData[id] as any)
    })).sort((a, b) => b.xp - a.xp).slice(0, 10);
    return { leaderboard };
  } catch (e) {
    return { leaderboard: [] };
  }
}

