import { useState, useEffect } from "react";

// Board type
export type Board = number[][];

// Board size
const SIZE = 4;

// Get empty cells
function getEmptyPositions(board: Board) {
  const empty: [number, number][] = [];
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] === 0) empty.push([i, j]);
    }
  }
  return empty;
}

// Add a random tile (2 or 4)
function addRandomTile(board: Board): Board {
  const empty = getEmptyPositions(board);
  if (empty.length === 0) return board;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = board.map(r => [...r]);
  newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

// Main hook
export function useGameLogic() {
  const [board, setBoard] = useState<Board>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  );
  const [score, setScore] = useState(0);

  // Initialize board with 2 tiles
  useEffect(() => {
    let b = addRandomTile(board);
    b = addRandomTile(b);
    setBoard(b);
  }, []);

  // Reset the game
  const reset = () => {
    let b: Board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    b = addRandomTile(b);
    b = addRandomTile(b);
    setBoard(b);
    setScore(0);
  };

  // Move tiles
  const move = (direction: "up" | "down" | "left" | "right") => {
    let rotated = rotateBoard(board, direction);
    let newBoard = rotated.map(row => {
      let filtered = row.filter(n => n !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          setScore(prev => prev + filtered[i]);
          filtered[i + 1] = 0;
        }
      }
      let newRow = filtered.filter(n => n !== 0);
      while (newRow.length < SIZE) newRow.push(0);
      return newRow;
    });

    // Reverse rotation to original direction
    newBoard = reverseRotateBoard(newBoard, direction);

    // Only update if board changed
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
      setBoard(addRandomTile(newBoard));
    }
  };

  return { board, score, reset, move };
};

// Rotate board helper
function rotateBoard(board: Board, dir: string): Board {
  let newBoard: Board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

  if (dir === "up") {
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE; j++)
        newBoard[i][j] = board[j][i];
  } else if (dir === "down") {
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE; j++)
        newBoard[i][j] = board[SIZE - 1 - j][i];
  } else if (dir === "left") {
    newBoard = board.map(r => [...r]);
  } else if (dir === "right") {
    newBoard = board.map(r => [...r].reverse());
  }

  return newBoard;
}

// Reverse rotation helper
function reverseRotateBoard(board: Board, dir: string): Board {
  let newBoard: Board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

  if (dir === "up") {
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE; j++)
        newBoard[j][i] = board[i][j];
  } else if (dir === "down") {
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE; j++)
        newBoard[SIZE - 1 - j][i] = board[i][j];
  } else if (dir === "left") {
    newBoard = board.map(r => [...r]);
  } else if (dir === "right") {
    newBoard = board.map(r => [...r].reverse());
  }

  return newBoard;
}
