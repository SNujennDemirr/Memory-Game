import React from 'react';

const getImageUrl = (index: number): string => {
  return `/assets/images/${index}.jpeg`;
};

const Header: React.FC = () => {
  const imageUrl = getImageUrl(9); 

  return (
    <header className="header">
    
      <img src={imageUrl} alt="Header Visual" className="header-image" />
    </header>
  );
};

export default Header;
