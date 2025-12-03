"use client";
import React, { useEffect, useState } from "react";

type ScoreItem = { id: string; username: string; score: number };

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreItem[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/getScores");
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };
    fetchScores();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#776e65" }}>Top 100 Leaderboard</h2>
      <div style={{
        backgroundColor: "#bbada0",
        padding: "10px",
        borderRadius: "8px",
        maxHeight: "400px",
        overflowY: "auto"
      }}>
        {scores.length === 0 ? <p style={{ color: "#eee4da" }}>No scores yet</p> :
          scores.map((item, index) => (
            <div key={item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: index % 2 === 0 ? "#ede0c8" : "#f2b179",
              padding: "8px",
              borderRadius: "6px",
              marginBottom: "5px",
              fontWeight: "bold",
              color: index % 2 === 0 ? "#776e65" : "#fff"
            }}>
              <span>{index + 1}. {item.username}</span>
              <span>{item.score}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
