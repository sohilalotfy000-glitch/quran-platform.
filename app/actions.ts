
"use server";
// @ts-nocheck
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function saveProgress(tasks: any, totalXP: number, uId: string, uName: string, uPic: string) {
  if (!uId) return;
  try {
    // هنجيب القائمة القديمة
    let board: any = (await kv.get("quran_board_final")) ||[];
    if (!Array.isArray(board)) board =[];
    
    // هنمسح اسمك القديم لو موجود عشان نحدثه بالنقط الجديدة
    board = board.filter((user: any) => user.id !== uId);
    
    // هنضيف اسمك ونقطك الجديدة
    board.push({ id: uId, name: uName || "طالب", avatar: uPic || "", xp: totalXP });
    
    // هنحفظ القائمة كلها
    await kv.set("quran_board_final", board);
    revalidatePath("/");
  } catch (e) {
    console.log("Error saving:", e);
  }
}

export async function getDashboardData() {
  try {
    let board: any = (await kv.get("quran_board_final")) ||[];
    if (!Array.isArray(board)) board =[];
    
    // ترتيب من الكبير للصغير
    board.sort((a: any, b: any) => b.xp - a.xp);
    return { leaderboard: board.slice(0, 10) };
  } catch (e) {
    return { leaderboard:



