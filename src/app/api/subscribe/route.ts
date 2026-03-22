import { getStore } from "@netlify/blobs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
  }

  const store = getStore("jadwal4b");
  const existing = (await store.get("subscribers", { type: "json" })) as string[] | null;
  const subscribers = existing ?? [];

  if (subscribers.includes(email)) {
    return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 200 });
  }

  subscribers.push(email);
  await store.set("subscribers", JSON.stringify(subscribers));

  return NextResponse.json({ message: "Berhasil subscribe!" }, { status: 200 });
}
