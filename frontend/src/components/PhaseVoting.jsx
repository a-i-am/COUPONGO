import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store';
import SpriteAnimator from './SpriteAnimator';

export default function PhaseVoting() {
  const { player, aiPlayers, castVote, votes } = useGameStore();
  const [hasVoted, setHasVoted] = useState(false);

  const allPlayers = [player, ...aiPlayers];

  const handleVote = (targetId) => {
    if (hasVoted) return;
    setHasVoted(true);
    castVote(targetId);
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 50
    }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          backgroundColor: '#2c3e50',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '2px solid #34495e',
          width: '80%',
          maxWidth: '600px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#e74c3c', marginBottom: '20px', fontSize: '2rem' }}>⚠️ 긴급 회의 ⚠️</h2>
        <p style={{ marginBottom: '30px', color: '#bdc3c7' }}>누가 승부조작을 시도했나요? 투표하세요!</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {allPlayers.map((p) => {
            const isVoted = votes['PLAYER'] === p.id;
            const voteCount = Object.values(votes).filter(v => v === p.id).length;

            return (
              <motion.div
                key={p.id}
                whileHover={!hasVoted ? { scale: 1.05 } : {}}
                whileTap={!hasVoted ? { scale: 0.95 } : {}}
                onClick={() => handleVote(p.id)}
                style={{
                  backgroundColor: isVoted ? '#e74c3c' : '#34495e',
                  padding: '10px',
                  borderRadius: '15px',
                  cursor: hasVoted ? 'default' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  border: isVoted ? '2px solid #ff7979' : '2px solid transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ marginBottom: '5px' }}>
                  <SpriteAnimator src={p.avatar} width={64} height={64} cols={3} rows={4} scale={1.2} />
                </div>
                <div style={{ fontWeight: 'bold', color: '#fff' }}>{p.name}</div>
                {Object.keys(votes).length > 0 && voteCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: '#eccc68',
                      color: '#2f3542',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    {voteCount}
                  </motion.div>
                )}
                <AnimatePresence>
                  {p.isJailed && (
                    <motion.img
                      src="/assets/ui/cage.png"
                      initial={{ y: -200 }}
                      animate={{ y: 0 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 10
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {!hasVoted && (
          <button
            onClick={() => handleVote(null)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#7f8c8d',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            기권 (Skip)
          </button>
        )}
      </motion.div>
    </div>
  );
}
