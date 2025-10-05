export type Player = 1 | 2 | null;

export interface GameState {
  board: Player[][];
  currentPlayer: 1 | 2;
  winner: Player;
  winningCells: number[][];
  isGameOver: boolean;
}

export interface Position {
  row: number;
  col: number;
}