import { getStore } from "@netlify/blobs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_SUBSCRIBE_ENABLED !== "true") {
    return new NextResponse("Fitur subscribe tidak aktif.", { status: 503 });
  }

  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return new NextResponse("Email tidak ditemukan.", { status: 400 });
  }

  const store = getStore("jadwal4b");
  const existing = (await store.get("subscribers", { type: "json" })) as string[] | null;
  const updated = (existing ?? []).filter((e: string) => e !== decodeURIComponent(email));

  await store.set("subscribers", JSON.stringify(updated));

  return new NextResponse(
    "Kamu berhasil unsubscribe. Notifikasi jadwal tidak akan dikirim lagi ke email ini.",
    { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
