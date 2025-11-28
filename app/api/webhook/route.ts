import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // handle server events here
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ status: "webhook alive" });
}
