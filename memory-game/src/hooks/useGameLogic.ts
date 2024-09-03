import { useState, useEffect } from 'react';

// Resimlerin import edilmesi
import img1 from '../assets/images/1.jpeg';
import img2 from '../assets/images/2.jpeg';
import img3 from '../assets/images/3.jpeg';
import img4 from '../assets/images/4.jpeg';
import img5 from '../assets/images/5.jpeg';
import img6 from '../assets/images/6.jpeg';
import img7 from '../assets/images/7.jpeg';
import img8 from '../assets/images/8.jpeg';

// Kart arayüzü
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
    const baseCards: Card[] = [
      { id: 0, image: img1, isFlipped: false },
      { id: 1, image: img1, isFlipped: false },
      { id: 2, image: img2, isFlipped: false },
      { id: 3, image: img2, isFlipped: false },
      { id: 4, image: img3, isFlipped: false },
      { id: 5, image: img3, isFlipped: false },
      { id: 6, image: img4, isFlipped: false },
      { id: 7, image: img4, isFlipped: false },
      { id: 8, image: img5, isFlipped: false },
      { id: 9, image: img5, isFlipped: false },
      { id: 10, image: img6, isFlipped: false },
      { id: 11, image: img6, isFlipped: false },
      { id: 12, image: img7, isFlipped: false },
      { id: 13, image: img7, isFlipped: false },
      { id: 14, image: img8, isFlipped: false },
      { id: 15, image: img8, isFlipped: false },
    ];

    setCards(shuffleArray(baseCards));
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
