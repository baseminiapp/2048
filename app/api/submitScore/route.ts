import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { username, score } = await req.json();

    if (!username || typeof score !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { error } = await supabase
      .from("scores")
      .insert([{ username, score }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Score submitted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
