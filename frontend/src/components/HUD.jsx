import React from 'react';
import { useGameStore } from '../store';
import { Trophy, Package } from 'lucide-react';

export function HUD() {
  const player = useGameStore(state => state.player);
  const ai = useGameStore(state => state.ai);
  const gameState = useGameStore(state => state.gameState);
  const startGame = useGameStore(state => state.startGame);

  return (
    <div className="hud-container">
      {gameState !== 'LOBBY' && (
        <div className="hud-interactive" style={{ position: 'absolute', top: 20, left: 20, display: 'flex', flexDirection: 'column', gap: '1rem', width: '250px' }}>
          <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '1rem', border: '2px solid #4ade80' }}>
            <h3 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0' }}>YOU</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Trophy color="#fde047" size={20} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{player.score} 점</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package color="#9ca3af" size={16} />
              <span style={{ fontSize: '0.9rem', color: '#d1d5db' }}>보유 쿠폰: {player.inventory.length}장</span>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '1rem', border: '2px solid transparent' }}>
            <h3 style={{ color: '#f87171', margin: '0 0 0.5rem 0' }}>AI Player</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Trophy color="#fde047" size={20} />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{ai.score} 점</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package color="#9ca3af" size={16} />
              <span style={{ fontSize: '0.9rem', color: '#d1d5db' }}>보유 쿠폰: {ai.inventory.length}장</span>
            </div>
          </div>
        </div>
      )}
      {gameState === 'LOBBY' && (
        <div className="hud-interactive" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <button
            className="btn btn-primary"
            style={{
              fontSize: '2rem',
              padding: '1.5rem 4rem',
              borderRadius: '3rem',
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)',
              cursor: 'pointer'
            }}
            onClick={startGame}
          >
            게임 시작 (Deal Cards)
          </button>
        </div>
      )}
    </div>
  );
}
