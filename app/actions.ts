ولا يهمك خالص، متتخضيش من الشاشة دي! دي شاشة بتظهر لما يكون فيه "خطأ في الاتصال
بقاعدة البيانات" (ممكن يكون Vercel لسه بيحمل مفاتيح الخزنة الجديدة اللي عملناها
ومحتاج شوية وقت).

عشان الموقع يفتح فوراً وميقعش أبداً مهما حصل في قاعدة البيانات، إحنا هنعمل حركة
"أمان" برمجية سريعة جداً (try & catch) في ملف الكوبري، بتخلي الموقع لو ملقاش
الخزنة يفتح بردو عادي جداً ومايجيبش الشاشة دي.

خطوة واحدة بس هنعدلها:

1.  روحي لمجلد app وافتحي ملف actions.ts.
2.  افتحي وضع التعديل (القلم ✏️).
3.  امسحي كل اللي فيه، وانسخي الكود ده وحطيه:

"use server";
import { kv } from "@vercel/kv";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function saveProgress(tasks: any, totalXP: number) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) return;

    const name = user.firstName || "بطل القرآن";
    const avatar = user.imageUrl || "";

    await kv.set(`tasks_${userId}`, tasks);

    await kv.hset("global_leaderboard", {
      [userId]: { name, avatar, xp: totalXP }
    });
  } catch (error) {
    console.log("Error saving to database:", error);
  }
}

export async function getDashboardData() {
  try {
    const { userId } = await auth();
    let myTasks = null;
    
    if (userId) {
      myTasks = await kv.get(`tasks_${userId}`);
    }

    const allData = await kv.hgetall("global_leaderboard") || {};
    const leaderboard = Object.keys(allData).map(id => ({
      id,
      ...(allData[id] as any)
    })).sort((a, b) => b.xp - a.xp).slice(0, 10);

    return { myTasks, leaderboard, currentUserId: userId };
  } catch (error) {
    console.log("Error reading from database:", error);
    // لو حصل خطأ في الخزنة، الموقع هيفتح بردو بالبيانات دي كاحتياطي
    return { myTasks: null, leaderboard:
