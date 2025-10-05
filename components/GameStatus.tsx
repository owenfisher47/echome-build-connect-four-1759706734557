import React from 'react';

interface GameStatusProps {
  currentPlayer: 1 | 2;
  winner: 1 | 2 | null;
  isGameOver: boolean;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
  isGameOver,
  onReset,
}) => {
  const getPlayerName = (player: 1 | 2) => {
    return player === 1 ? 'Red' : 'Yellow';
  };

  const getPlayerColor = (player: 1 | 2) => {
    return player === 1 ? 'text-red-500' : 'text-yellow-400';
  };

  const getStatus = () => {
    if (winner) {
      return (
        <div className="text-2xl font-bold text-center">
          🎉 <span className={getPlayerColor(winner)}>{getPlayerName(winner)}</span> Wins! 🎉
        </div>
      );
    }

    if (isGameOver) {
      return (
        <div className="text-2xl font-bold text-center text-gray-300">
          It's a Draw! 🤝
        </div>
      );
    }

    return (
      <div className="text-xl font-semibold text-center">
        <span className={getPlayerColor(currentPlayer)}>
          {getPlayerName(currentPlayer)}
        </span>'s Turn
      </div>
    );
  };

  return (
    <div className="text-white space-y-4">
      {getStatus()}
      
      <div className="flex justify-center space-x-4 items-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-red-500 font-medium">Red Player</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span className="text-yellow-400 font-medium">Yellow Player</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameStatus;