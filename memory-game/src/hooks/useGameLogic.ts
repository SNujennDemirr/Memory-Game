import { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
}

export const useGameLogic = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Kartları oluştur ve karıştır
    const baseCards = Array.from({ length: 6 }, (_, i) => [
      { id: i * 2, image: `/assets/images/${i + 1}.jpeg`, isFlipped: false },
      { id: i * 2 + 1, image: `/assets/images/${i + 1}.jpeg`, isFlipped: false },
    ]);
    const newCards = baseCards.reduce((acc, val) => acc.concat(val), []);
    setCards(shuffleArray(newCards));
  }, []);

  const shuffleArray = (array: Card[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        setMatchedPairs(prev => new Set(prev).add(cards[firstIndex].image));
      } else {
        setTimeout(() => {
          setCards(cards.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, isFlipped: false } : card
          ));
        }, 1000);
      }
      setFlippedIndices([]);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped) return;

    setCards(cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedIndices([...flippedIndices, index]);
  };

  const allCardsMatched = cards.every(card => matchedPairs.has(card.image));

  return { cards, handleCardClick, allCardsMatched };
};
