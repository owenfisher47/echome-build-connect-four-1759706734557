import React from 'react';
import GameCell from './GameCell';
import { Player } from '@/types/game';

interface GameBoardProps {
  board: Player[][];
  onCellClick: (col: number) => void;
  isWinningCell: (row: number, col: number) => boolean;
  isGameOver: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  isWinningCell,
  isGameOver,
}) => {
  return (
    <div className="game-board p-6 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-7 gap-1 bg-blue-600 p-4 rounded-xl">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(colIndex)}
              isWinningCell={isWinningCell(rowIndex, colIndex)}
              isClickable={!isGameOver}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;