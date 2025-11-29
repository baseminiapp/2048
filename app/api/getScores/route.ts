import { supabase } from "../supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Supabase getScores error:", error);
    return new Response(JSON.stringify([]), { status: 400 });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
