import React from 'react';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, image, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => onClick(id)}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          {isFlipped && <img src={image} alt="card" />}
        </div>
      </div>
    </div>
  );
};

export default Card;
