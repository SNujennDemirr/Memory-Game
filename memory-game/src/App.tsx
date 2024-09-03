import React from 'react';
import Board from './components/Board';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Board />
    </div>
  );
}

export default App;
