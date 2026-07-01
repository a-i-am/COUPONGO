import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store';
import SpriteAnimator from './SpriteAnimator';

export default function PhaseRacing() {
  const { horses, simulateRaceStep } = useGameStore();
  const [raceActive, setRaceActive] = useState(false);

  useEffect(() => {

    const flipTimer = setTimeout(() => {
      setRaceActive(true);
    }, 2000);

    return () => clearTimeout(flipTimer);
  }, []);

  useEffect(() => {
    let raceInterval;
    if (raceActive) {
      raceInterval = setInterval(() => {
        simulateRaceStep();
      }, 500);
    }

    return () => clearInterval(raceInterval);
  }, [raceActive, simulateRaceStep]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', textShadow: '2px 2px 4px #000' }}>레이싱 페이즈</h2>
      <p style={{ color: '#bdc3c7', textAlign: 'center', marginBottom: '20px' }}>{raceActive ? '경주가 시작되었습니다!' : '쿠폰을 공개합니다...'}</p>

      <div style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: '15px',
        padding: '20px',
        border: '2px solid rgba(255,255,255,0.2)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          right: '40px',
          top: '20px',
          bottom: '20px',
          width: '10px',
          background: 'repeating-linear-gradient(45deg, #fff, #fff 10px, #000 10px, #000 20px)',
          zIndex: 5
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {horses.map(horse => (
          <div key={horse.id} style={{ position: 'relative', height: '45px', borderBottom: '1px dashed rgba(255,255,255,0.3)' }}>

            <motion.div
              animate={{
                left: `calc(${horse.position}% - 30px)`,
                y: raceActive ? [0, -10, 0] : 0
              }}
              transition={{
                left: { type: 'tween', duration: 0.5, ease: 'linear' },
                y: { repeat: Infinity, duration: 0.4, ease: 'easeInOut' }
              }}
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '-15px',
                zIndex: 10
              }}
            >
              <SpriteAnimator src={horse.sprite} width={60} height={60} cols={4} rows={9} row={6} />
              <div style={{ position: 'absolute', top: '-15px', color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 2px #000', fontSize: '0.8rem' }}>
                {horse.name}
              </div>

              <div style={{ position: 'absolute', top: '-40px', display: 'flex', gap: '5px' }}>
                {raceActive && horse.coupons.some(c => c.type === 'STUN') && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '2px' }}>
                    🍌
                  </motion.div>
                )}
                {raceActive && horse.coupons.some(c => c.type === 'SPEED_UP') && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '2px' }}>
                    💨
                  </motion.div>
                )}
              </div>
            </motion.div>

            <div style={{ position: 'absolute', right: '10px', top: '10px', display: 'flex', gap: '5px', zIndex: 20 }}>
              {horse.coupons.map((coupon, idx) => (
                <div key={idx} style={{
                  backgroundColor: coupon.color,
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  {coupon.icon} {coupon.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
