import { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
}

const getImageUrl = (index: number): string => {
  return `/assets/images/${index + 1}.jpeg`;
};

export const useGameLogic = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const initializeCards = () => {
      const newCards: Card[] = [];
      for (let i = 0; i < 8; i++) {
        const imageUrl = getImageUrl(i);
        newCards.push({ id: i * 2, image: imageUrl, isFlipped: false });
        newCards.push({ id: i * 2 + 1, image: imageUrl, isFlipped: false });
      }
      setCards(shuffleArray(newCards));
    };
    
    initializeCards();
  }, []);

  const shuffleArray = (array: Card[]): Card[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const handleCardClick = (id: number) => {

    if (isDisabled || cards.find(card => card.id === id)?.isFlipped) return;

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    const flipped = updatedCards.filter(card => card.isFlipped);

    setCards(updatedCards);
    setFlippedIndices(prev => [...prev, id]);

    
    if (flipped.length === 2) {
      setIsDisabled(true);
      setTimeout(() => {
        checkMatch(flipped);
        setIsDisabled(false);
        setFlippedIndices([]);
      }, 1000);
    }
  };

  const checkMatch = (flipped: Card[]) => {
    const [first, second] = flipped;
    if (first.image === second.image) {
      setCards(cards.map(card =>
        card.id === first.id || card.id === second.id
          ? { ...card, isFlipped: true }
          : card
      ));
    } else {
      setCards(cards.map(card =>
        card.id === first.id || card.id === second.id
          ? { ...card, isFlipped: false }
          : card
      ));
    }
  };

  return { cards, handleCardClick };
};
