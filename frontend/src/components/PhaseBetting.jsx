import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store';
import SpriteAnimator from './SpriteAnimator';

export default function PhaseBetting() {
  const { horses, playCoupon, simulateAIBetting, startRacingPhase, player } = useGameStore();
  const [isReady, setIsReady] = useState(false);

  const handleDrop = (e, horseId) => {
    e.preventDefault();
    if (isReady || player.isJailed) return;

    const couponInstanceId = e.dataTransfer.getData('text/plain');
    if (couponInstanceId) {
      playCoupon(horseId, couponInstanceId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleReady = () => {
    setIsReady(true);
    simulateAIBetting();
    setTimeout(() => {
      startRacingPhase();
    }, 2000);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{
        background: 'rgba(46, 204, 113, 0.2)',
        border: '2px solid #2ecc71',
        borderRadius: '10px',
        padding: '10px 20px',
        color: '#2ecc71',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginTop: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <span>[준비 단계] 우승할 것 같은 말에게 쿠폰을 드래그하여 베팅하세요!</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReady}
          disabled={isReady}
          style={{
            padding: '8px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: isReady ? '#95a5a6' : '#2ecc71',
            color: 'white',
            cursor: isReady ? 'not-allowed' : 'pointer',
            boxShadow: isReady ? 'none' : '0 4px 15px rgba(46, 204, 113, 0.4)'
          }}
        >
          {isReady ? 'AI 베팅 중...' : '준비 완료'}
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px 30px', marginTop: '15px' }}>
        {horses.map(horse => (
          <div
            key={horse.id}
            onDrop={(e) => handleDrop(e, horse.id)}
            onDragOver={handleDragOver}
            style={{
              width: '130px',
              height: '190px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '2px dashed rgba(255,255,255,0.3)',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div style={{
              width: '70px', height: '70px',
              marginTop: '10px',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              overflow: 'hidden',
              borderRadius: '10px',
              backgroundColor: 'rgba(0,0,0,0.4)',
              border: `2px solid ${horse.color}`
            }}>
              <SpriteAnimator src={horse.sprite} width={70} height={70} cols={4} rows={9} row={6} frame={0} scale={1.8} />
            </div>
            <div style={{ fontWeight: 'bold', marginTop: '5px', color: '#fff', textShadow: '1px 1px 2px #000', fontSize: '0.9rem' }}>
              {horse.name}
            </div>

            <div style={{ marginTop: '5px', position: 'relative', width: '70px', height: '80px' }}>
              <AnimatePresence>
                {horse.coupons.map((coupon, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      top: `${idx * 10}px`,
                      left: '0',
                      width: '70px',
                      height: '90px',
                      backgroundColor: coupon.owner === 'PLAYER' ? coupon.color : '#2d3436',
                      borderRadius: '8px',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: idx
                    }}
                  >
                    {coupon.owner === 'PLAYER' ? (
                      <>
                        <span style={{ fontSize: '1.5rem' }}>{coupon.icon}</span>
                        <span style={{ fontSize: '0.6rem', fontWeight: 'bold', marginTop: '2px', textAlign: 'center', lineHeight: '1.1' }}>
                          {coupon.name}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: '2.5rem', color: '#636e72', textShadow: '1px 1px 0 #000' }}>?</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
