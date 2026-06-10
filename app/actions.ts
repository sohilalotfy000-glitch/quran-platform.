"use server";
// @ts-nocheck
import { revalidatePath } from "next/cache";

export async function saveProgress(tasks: any, totalXP: number, uId: string, uName: string, uPic: string) {
  if (!uId) return;
  try {
    // حفظ النقط جوه حساب المتدرب مباشرة في نظام الدخول
    await fetch(`https://api.clerk.com/v1/users/${uId}/metadata`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ public_metadata: { xp: totalXP, name: uName, avatar: uPic } })
    });
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
}

export async function getDashboardData() {
  try {
    // جلب كل المشتركين بنقاطهم
    const res = await fetch("https://api.clerk.com/v1/users?limit=100", {
      headers: { 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}` },
      cache: 'no-store'
    });
    
    if (!res.ok) return { leaderboard: [] };
    
    const users = await res.json();
    let board = [];
    
    if (Array.isArray(users)) {
      board = users
        .filter((u: any) => u.public_metadata && u.public_metadata.xp > 0)
        .map((u: any) => ({
          id: u.id,
          name: u.public_metadata.name || u.first_name || "بطل القرآن",
          avatar: u.public_metadata.avatar || u.image_url || "",
          xp: u.public_metadata.xp || 0
        }));
      // الترتيب من الأول للأخير
      board.sort((a: any, b: any) => b.xp - a.xp);
    }
    
    return { leaderboard: board.slice(0, 10) };
  } catch (e) {
    return { leaderboard: [] };
  }
}
