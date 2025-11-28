'use client';
import React, { useEffect, useState } from "react";
import { useGameLogic, Board } from "./useGameLogic";
import styles from "./styles.module.css";

type LeaderboardEntry = {
  username: string;
  score: number;
};

export default function GameBoard() {
  const { board, move, reset, score } = useGameLogic();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch("/api/getScores");
        const data = await res.json();
        setLeaderboard(data.scores || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchScores();
  }, [score]);

  const submitScore = async () => {
    if (!username) return alert("Enter username");
    try {
      await fetch("/api/submitScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score })
      });
      setUsername("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.gameContainer}>
      <h1>2048</h1>
      <div className={styles.board}>
        {board.map((row: number[], i: number) =>
          row.map((tile: number, j: number) => (
            <div key={`${i}-${j}`} className={styles.tile}>
              {tile !== 0 ? tile : ""}
            </div>
          ))
        )}
      </div>

      <button className={styles.newGameBtn} onClick={reset}>New Game</button>

      <div>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={submitScore}>Submit Score</button>
      </div>

      <div className={styles.leaderboard}>
        <h3>Leaderboard</h3>
        {leaderboard.length ? (
          leaderboard.map((entry, i) => (
            <div key={i} className={styles.leaderboardEntry}>
              <span>{entry.username}</span>
              <span>{entry.score}</span>
            </div>
          ))
        ) : (
          <div>No scores yet</div>
        )}
      </div>
    </div>
  );
}
