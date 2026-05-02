"use server";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function saveProgress(tasks: any, totalXP: number, uId: string, uName: string, uPic: string) {
  try {
    if (!uId) return;
    await kv.set(`tasks_${uId}`, tasks);
    await kv.hset("global_leaderboard", { [uId]: { name: uName || "بطل", avatar: uPic || "", xp: totalXP } });
    revalidatePath("/");
  } catch (e) { console.log(e); }
}

export async function getDashboardData() {
  try {
    const allData = (await kv.hgetall("global_leaderboard")) || {};
    const leaderboard = Object.keys(allData).map(id => ({ id, ...(allData[id] as any) })).sort((a, b) => b.xp - a.xp).slice(0, 10);
    return { leaderboard };
  } catch (e) { return { leaderboard:[] }; }
}
