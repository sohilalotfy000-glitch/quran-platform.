
"use server";
// @ts-nocheck
import { revalidatePath } from "next/cache";

export async function saveProgress(tasks: any, totalXP: number, uId: string) {
  if (!uId) return;
  try {
    // حفظ النقط جوه حساب المتدرب في Clerk مباشرة
    await fetch(`https://api.clerk.com/v1/users/${uId}/metadata`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ public_metadata: { xp: totalXP } })
    });
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
}

export async function getDashboardData() {
  try {
    // جلب كل المتدربين بنقطهم من Clerk
    const res = await fetch(`https://api.clerk.com/v1/users?limit=100`, {
      headers: { 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}` },
      cache: 'no-store'
    });
    const users = await res.json();
    
    let board =[];
    if (Array.isArray(users)) {
      board = users.filter(u => u.public_metadata && u.public_metadata.xp > 0).map(u => ({
        id: u.id,
        name: u.first_name || "بطل",
        avatar: u.image_url || "",
        xp: u.public_metadata.xp || 0
      }));
      // ترتيب المتصدرين من الكبير للصغير
      board.sort((a, b) => b.xp - a.xp);
    }
    
    return { leaderboard: board.slice(0, 10) };
  } catch (e) {
    return { leaderboard:[] };
}
}


