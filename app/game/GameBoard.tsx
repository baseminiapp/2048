'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./styles.module.css";

type Tile = {
  id: string;
  value: number;
};

type ScoreEntry = {
  id: string;
  username: string;
  score: number;
};

const GRID_SIZE = 4;

function generateEmptyGrid(): Tile[][] {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill({ id: '', value: 0 }));
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function GameBoard() {
  const [grid, setGrid] = useState<Tile[][]>(generateEmptyGrid());
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [username, setUsername] = useState("");

  // --- Leaderboard Fetch ---
  const fetchLeaderboard = useCallback(async () => {
    const res = await fetch("/api/getScores");
    const data = await res.json();
    setLeaderboard(data);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // --- Add random tile ---
  const addRandomTile = (g: Tile[][]) => {
    const empty: [number, number][] = [];
    g.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell.value === 0) empty.push([i, j]);
      })
    );
    if (empty.length === 0) return g;
    const [i, j] = empty[getRandomInt(empty.length)];
    g[i][j] = { id: crypto.randomUUID(), value: Math.random() < 0.9 ? 2 : 4 };
    return g;
  };

  const startNewGame = () => {
    const newGrid = addRandomTile(addRandomTile(generateEmptyGrid()));
    setGrid(newGrid);
    setScore(0);
  };

  // --- Move logic ---
  const slide = (row: Tile[]) => {
    const nonZero = row.filter((t) => t.value !== 0);
    const newRow: Tile[] = [];
    let skip = false;
    for (let i = 0; i < nonZero.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }
      if (nonZero[i + 1] && nonZero[i].value === nonZero[i + 1].value) {
        const merged = { id: crypto.randomUUID(), value: nonZero[i].value * 2 };
        newRow.push(merged);
        setScore((s) => s + merged.value);
        skip = true;
      } else {
        newRow.push(nonZero[i]);
      }
    }
    while (newRow.length < GRID_SIZE) newRow.push({ id: '', value: 0 });
    return newRow;
  };

  const moveLeft = () => setGrid((g) => g.map((r) => slide(r)));
  const moveRight = () =>
    setGrid((g) => g.map((r) => slide([...r].reverse()).reverse()));
  const moveUp = () => {
    const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
    const moved = transposed.map((r) => slide(r));
    const newGrid = moved[0].map((_, i) => moved.map((row) => row[i]));
    setGrid(newGrid);
  };
  const moveDown = () => {
    const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
    const moved = transposed.map((r) => slide([...r].reverse()).reverse());
    const newGrid = moved[0].map((_, i) => moved.map((row) => row[i]));
    setGrid(newGrid);
  };

  // --- Key handler ---
  const handleKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // --- Swipe handler ---
  const handlers = useSwipeable({
    onSwipedLeft: moveLeft,
    onSwipedRight: moveRight,
    onSwipedUp: moveUp,
    onSwipedDown: moveDown,
    trackMouse: true,
  });

  // --- Add random tile after move ---
  useEffect(() => {
    setGrid((g) => addRandomTile([...g.map((r) => [...r])]));
  }, [grid]);

  // --- Submit score ---
  const submitScore = async () => {
    if (!username) return alert("Enter username");
    await fetch("/api/submitScore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, score }),
    });
    fetchLeaderboard();
  };

  return (
    <div className={styles.container} {...handlers}>
      <h2>2048</h2>
      <div className={styles.score}>Score: {score}</div>

      <div className={styles.grid}>
        {grid.map((row, i) =>
          row.map((tile, j) => (
            <div key={tile.id || `${i}-${j}`} className={styles.tile}>
              {tile.value !== 0 ? tile.value : ""}
            </div>
          ))
        )}
      </div>

      <button className={styles.newGameBtn} onClick={startNewGame}>
        New Game
      </button>

      <div className={styles.username}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={submitScore}>Submit Score</button>
      </div>

      <div className={styles.leaderboard}>
        <h3>Leaderboard</h3>
        {leaderboard.map((entry, idx) => (
          <div key={entry.id} className={styles.leaderboardEntry}>
            <span>{idx + 1}. {entry.username}</span>
            <span>{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
