"use client";

import React, { useEffect } from "react";
import { useGameLogic } from "./useGameLogic";
import styles from "./styles.module.css";

export default function GameBoard() {
  const { board, score, reset, move } = useGameLogic();

  // Arrow key controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
        case "ArrowRight": move("right"); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2048 Game</h1>
      <div className={styles.score}>Score: {score}</div>
      <div className={styles.board}>
        {board.flat().map((value, i) => (
          <div key={i} className={`${styles.tile} ${styles["tile-" + value]}`}>
            {value !== 0 ? value : ""}
          </div>
        ))}
      </div>
      <button className={styles.reset} onClick={reset}>New Game</button>
    </div>
  );
}
