import { useState, useCallback } from 'react';
import { GameState, Player, Position } from '@/types/game';

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = (): Player[][] => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

const checkWin = (board: Player[][], row: number, col: number, player: Player): Position[] => {
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal /
    [1, -1],  // diagonal \
  ];

  for (const [deltaRow, deltaCol] of directions) {
    const positions: Position[] = [{ row, col }];
    
    // Check in positive direction
    let r = row + deltaRow;
    let c = col + deltaCol;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      positions.push({ row: r, col: c });
      r += deltaRow;
      c += deltaCol;
    }
    
    // Check in negative direction
    r = row - deltaRow;
    c = col - deltaCol;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      positions.push({ row: r, col: c });
      r -= deltaRow;
      c -= deltaCol;
    }
    
    if (positions.length >= 4) {
      return positions;
    }
  }
  
  return [];
};

const isBoardFull = (board: Player[][]): boolean => {
  return board[0].every(cell => cell !== null);
};

export const useConnectFour = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 1,
    winner: null,
    winningCells: [],
    isGameOver: false,
  });

  const dropPiece = useCallback((col: number): boolean => {
    if (gameState.isGameOver || col < 0 || col >= COLS) {
      return false;
    }

    const newBoard = gameState.board.map(row => [...row]);
    
    // Find the lowest empty row in the column
    let targetRow = -1;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        targetRow = row;
        break;
      }
    }

    // Column is full
    if (targetRow === -1) {
      return false;
    }

    // Place the piece
    newBoard[targetRow][col] = gameState.currentPlayer;

    // Check for win
    const winningPositions = checkWin(newBoard, targetRow, col, gameState.currentPlayer);
    const hasWon = winningPositions.length > 0;
    const boardFull = isBoardFull(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: hasWon || boardFull ? gameState.currentPlayer : (gameState.currentPlayer === 1 ? 2 : 1),
      winner: hasWon ? gameState.currentPlayer : null,
      winningCells: winningPositions.map(pos => [pos.row, pos.col]),
      isGameOver: hasWon || boardFull,
    });

    return true;
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 1,
      winner: null,
      winningCells: [],
      isGameOver: false,
    });
  }, []);

  const isWinningCell = useCallback((row: number, col: number): boolean => {
    return gameState.winningCells.some(([r, c]) => r === row && c === col);
  }, [gameState.winningCells]);

  return {
    gameState,
    dropPiece,
    resetGame,
    isWinningCell,
  };
};