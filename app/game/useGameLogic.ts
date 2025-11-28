'use client';
import { useState, useEffect } from "react";

export type Board = number[][];

export function useGameLogic() {
  const [board, setBoard] = useState<Board>(generateEmptyBoard());
  const [score, setScore] = useState<number>(0);

  function generateEmptyBoard(): Board {
    return Array.from({ length: 4 }, () => Array(4).fill(0));
  }

  function addRandomTile(newBoard: Board): Board {
    const empty: [number, number][] = [];
    newBoard.forEach((row, i) =>
      row.forEach((tile, j) => {
        if (tile === 0) empty.push([i, j]);
      })
    );
    if (empty.length === 0) return newBoard;
    const [i, j] = empty[Math.floor(Math.random() * empty.length)];
    newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  }

  function reset() {
    let b = generateEmptyBoard();
    b = addRandomTile(addRandomTile(b));
    setBoard(b);
    setScore(0);
  }

  useEffect(() => {
    reset();
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        move(e.key.replace("Arrow", "").toLowerCase());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function move(direction: string) {
    let newBoard: Board = board.map((row) => [...row]);
    let changed = false;

    const combine = (line: number[]): number[] => {
      const newLine = line.filter((n) => n !== 0);
      for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
          newLine[i] *= 2;
          setScore((prev) => prev + newLine[i]);
          newLine[i + 1] = 0;
        }
      }
      return newLine.filter((n) => n !== 0).concat(Array(line.length).fill(0)).slice(0, 4);
    };

    if (direction === "left") {
      newBoard = newBoard.map(combine);
    } else if (direction === "right") {
      newBoard = newBoard.map((row) => combine(row.reverse()).reverse());
    } else if (direction === "up") {
      newBoard = rotate(newBoard);
      newBoard = newBoard.map(combine);
      newBoard = rotate(newBoard, true);
    } else if (direction === "down") {
      newBoard = rotate(newBoard);
      newBoard = newBoard.map((row) => combine(row.reverse()).reverse());
      newBoard = rotate(newBoard, true);
    }

    changed = JSON.stringify(newBoard) !== JSON.stringify(board);
    if (changed) newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
  }

  function rotate(matrix: Board, counterClockwise = false): Board {
    const N = matrix.length;
    const result: Board = Array.from({ length: N }, () => Array(N).fill(0));
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        result[counterClockwise ? N - j - 1 : j][counterClockwise ? i : i] = matrix[i][j];
    return result;
  }

  return { board, move, reset, score };
}
