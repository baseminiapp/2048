import { supabase } from "../supabaseClient";

export async function POST(req: Request) {
  try {
    const { username, score } = await req.json();

    if (!username || score == null) {
      return new Response(JSON.stringify({ error: "Username and score required" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("scores")
      .insert([{ username, score }]);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to submit score" }), { status: 500 });
  }
}
