import React from 'react';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  onClick: (index: number) => void;
}

const Card: React.FC<CardProps> = ({ id, image, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => onClick(id)}
    >
      {isFlipped ? <img src={image} alt="card" /> : <div className="card-back" />}
    </div>
  );
}

export default Card;
