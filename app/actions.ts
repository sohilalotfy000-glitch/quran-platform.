
"use server";
import { kv } from "@vercel/kv";
import { auth } from "@clerk/nextjs/server";

export async function saveTasks(tasks: any) {
  const { userId } = auth();
  if (!userId) return;
  await kv.set(`tasks_${userId}`, tasks);
}

export async function getTasks() {
  const { userId } = auth();
  if (!userId) return null;
  return await kv.get(`tasks_${userId}`);
}
