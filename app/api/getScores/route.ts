import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supabaseClient";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })
      .limit(10); // Top 10 scores

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ scores: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
