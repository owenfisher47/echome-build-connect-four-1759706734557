import React from 'react';
import { Player } from '@/types/game';

interface GameCellProps {
  value: Player;
  onClick: () => void;
  isWinningCell: boolean;
  isClickable: boolean;
}

const GameCell: React.FC<GameCellProps> = ({ 
  value, 
  onClick, 
  isWinningCell, 
  isClickable 
}) => {
  const getPieceColor = () => {
    if (value === 1) return 'bg-red-500';
    if (value === 2) return 'bg-yellow-400';
    return 'bg-gray-100';
  };

  const getPieceClasses = () => {
    let classes = `w-16 h-16 rounded-full border-2 border-gray-300 ${getPieceColor()}`;
    
    if (value !== null) {
      classes += ' piece-drop';
    }
    
    if (isWinningCell) {
      classes += ' winner-highlight border-yellow-300';
    }
    
    if (isClickable && value === null) {
      classes += ' cell-hover cursor-pointer hover:bg-gray-200';
    }
    
    return classes;
  };

  return (
    <div className="p-1">
      <div
        className={getPieceClasses()}
        onClick={isClickable ? onClick : undefined}
        role="button"
        tabIndex={isClickable ? 0 : -1}
      />
    </div>
  );
};

export default GameCell;