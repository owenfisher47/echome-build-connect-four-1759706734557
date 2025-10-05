'use client';

import React from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import { useConnectFour } from '@/hooks/useConnectFour';

const ConnectFour: React.FC = () => {
  const { gameState, dropPiece, resetGame, isWinningCell } = useConnectFour();

  const handleCellClick = (col: number) => {
    dropPiece(col);
  };

  return (
    <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
      <GameStatus
        currentPlayer={gameState.currentPlayer}
        winner={gameState.winner}
        isGameOver={gameState.isGameOver}
        onReset={resetGame}
      />
      
      <GameBoard
        board={gameState.board}
        onCellClick={handleCellClick}
        isWinningCell={isWinningCell}
        isGameOver={gameState.isGameOver}
      />

      <div className="text-white text-center max-w-md">
        <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
        <p className="text-sm text-gray-300">
          Click on any column to drop your piece. Get four in a row horizontally, 
          vertically, or diagonally to win!
        </p>
      </div>
    </div>
  );
};

export default ConnectFour;