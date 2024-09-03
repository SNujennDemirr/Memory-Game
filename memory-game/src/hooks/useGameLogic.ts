import { useState } from 'react';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
}

export const useGameLogic = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, image: '/assets/images/1.jpeg', isFlipped: false },
    { id: 2, image: '/assets/images/2.jpeg', isFlipped: false },
    { id: 3, image: '/assets/images/3.jpeg', isFlipped: false },
    { id: 4, image: '/assets/images/4.jpeg', isFlipped: false },
    { id: 5, image: '/assets/images/5.jpeg', isFlipped: false },
    { id: 6, image: '/assets/images/6.jpeg', isFlipped: false },
    // Daha fazla kart ekleyebilirsiniz
  ]);

  const handleCardClick = (id: number) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ));
  };

  return { cards, handleCardClick };
};
