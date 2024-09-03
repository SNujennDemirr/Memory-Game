import React from 'react';
import Card from './Card';
import { useGameLogic } from '../hooks/useGameLogic';

const Board: React.FC = () => {
  const { cards, handleCardClick } = useGameLogic();

  return (
    <div className="board">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          isFlipped={card.isFlipped}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default Board;
