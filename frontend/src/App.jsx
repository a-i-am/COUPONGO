import React from 'react';
import { useGameStore } from './store';
import PhaseBetting from './components/PhaseBetting';
import PhaseRacing from './components/PhaseRacing';
import PhaseVoting from './components/PhaseVoting';
import Inventory from './components/Inventory';

function App() {
  const { gameState, round, startGame } = useGameStore();

  if (gameState === 'LOBBY') {
    return (
      <div className="lobby-screen">
        <h1>CouponGo</h1>
        <p>합법적 승부조작 보드게임</p>
        <button onClick={startGame} className="start-btn">게임 시작</button>
      </div>
    );
  }

  if (gameState === 'GAMEOVER') {
    return (
      <div className="lobby-screen">
        <h1>Game Over</h1>
        <button onClick={startGame} className="start-btn">다시 시작</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="round-info">Round {round} / 5</div>
        <div className="phase-info">
          {gameState === 'BETTING' && '쿠폰 투하 (Blind Betting)'}
          {gameState === 'RACING' && '레이스 (Auto-Race)'}
          {gameState === 'VOTING' && '긴급 회의 (Voting)'}
        </div>
      </header>
      <main className="game-board">
        {gameState === 'BETTING' && <PhaseBetting />}
        {gameState === 'RACING' && <PhaseRacing />}
        {gameState === 'VOTING' && <PhaseVoting />}
      </main>
      <Inventory />
    </div>
  );
}

export default App;
