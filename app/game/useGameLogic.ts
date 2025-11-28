"use client";

import { useEffect, useState } from "react";

type Board = number[];

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

export function useGameLogic() {
  const [board, setBoard] = useState<Board>(Array(TILE_COUNT).fill(0));
  const [score, setScore] = useState(0);

  // Generate random tile (2 or 4)
  const addRandomTile = (newBoard: Board) => {
    const emptyIndexes = newBoard
      .map((val, i) => (val === 0 ? i : null))
      .filter((v) => v !== null) as number[];

    if (emptyIndexes.length === 0) return newBoard;

    const index = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    newBoard[index] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  };

  // Start game
  const reset = () => {
    const newBoard = Array(TILE_COUNT).fill(0);
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard([...newBoard]);
    setScore(0);
  };

  // Movement tool
  const slideRow = (row: number[]) => {
    const filtered = row.filter((n) => n !== 0);
    const merged: number[] = [];

    let i = 0;
    while (i < filtered.length) {
      if (filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2);
        setScore((s) => s + filtered[i] * 2);
        i += 2;
      } else {
        merged.push(filtered[i]);
        i++;
      }
    }

    while (merged.length < GRID_SIZE) {
      merged.push(0);
    }

    return merged;
  };

  // Move functions
  const moveLeft = () => {
    const newBoard = [...board];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row = newBoard.slice(r * GRID_SIZE, r * GRID_SIZE + GRID_SIZE);
      const moved = slideRow(row);
      for (let c = 0; c < GRID_SIZE; c++) {
        newBoard[r * GRID_SIZE + c] = moved[c];
      }
    }
    setBoard(addRandomTile(newBoard.slice()));
  };

  const moveRight = () => {
    const newBoard = [...board];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row = newBoard
        .slice(r * GRID_SIZE, r * GRID_SIZE + GRID_SIZE)
        .reverse();
      const moved = slideRow(row).reverse();
      for (let c = 0; c < GRID_SIZE; c++) {
        newBoard[r * GRID_SIZE + c] = moved[c];
      }
    }
    setBoard(addRandomTile(newBoard.slice()));
  };

  const moveUp = () => {
    const newBoard = [...board];
    for (let c = 0; c < GRID_SIZE; c++) {
      const col = [];
      for (let r = 0; r < GRID_SIZE; r++) {
        col.push(newBoard[r * GRID_SIZE + c]);
      }
      const moved = slideRow(col);
      for (let r = 0; r < GRID_SIZE; r++) {
        newBoard[r * GRID_SIZE + c] = moved[r];
      }
    }
    setBoard(addRandomTile(newBoard.slice()));
  };

  const moveDown = () => {
    const newBoard = [...board];
    for (let c = 0; c < GRID_SIZE; c++) {
      const col = [];
      for (let r = 0; r < GRID_SIZE; r++) {
        col.push(newBoard[r * GRID_SIZE + c]);
      }
      const moved = slideRow(col.reverse()).reverse();
      for (let r = 0; r < GRID_SIZE; r++) {
        newBoard[r * GRID_SIZE + c] = moved[r];
      }
    }
    setBoard(addRandomTile(newBoard.slice()));
  };

  // Listen to keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
      if (e.key === "ArrowUp") moveUp();
      if (e.key === "ArrowDown") moveDown();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    reset();
  }, []);

  return {
    board,
    score,
    reset,
  };
}
