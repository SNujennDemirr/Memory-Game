import React from 'react';
import Card from './Card';
import { useGameLogic } from '../hooks/useGameLogic';

const Board: React.FC = () => {
  const { cards, handleCardClick, allCardsMatched } = useGameLogic();

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={index}
          image={card.image}
          isFlipped={card.isFlipped}
          onClick={handleCardClick}
        />
      ))}
      {allCardsMatched && <div className="message">Tebrikler! Tüm kartları eşleştirdiniz!</div>}
    </div>
  );
};

export default Board;
