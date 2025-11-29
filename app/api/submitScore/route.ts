import { supabase } from "../supabaseClient";

export async function POST(request: Request) {
  try {
    const { username, score } = await request.json();

    if (!username || typeof score !== "number") {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("scores")
      .insert([{ username, score }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("submitScore crashed:", err);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
