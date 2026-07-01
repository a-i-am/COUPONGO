import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store';

export default function Inventory() {
  const { gameState, player } = useGameStore();


  const isVisible = gameState === 'BETTING' || gameState === 'LOBBY';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="inventory-container"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '180px',
            background: 'rgba(20, 20, 30, 0.85)',
            backdropFilter: 'blur(10px)',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            padding: '20px',
            zIndex: 100
          }}
        >
          {player.isJailed && (
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, #f1c40f, #f1c40f 20px, #000 20px, #000 40px)', opacity: 0.5, zIndex: 110 }}></div>
          )}
          {player.isJailed && (
            <h2 style={{ position: 'absolute', zIndex: 120, color: 'white', textShadow: '2px 2px 0 #000' }}>사용 금지 (감옥)</h2>
          )}

          {player.inventory.map((coupon) => (
            <motion.div
              key={coupon.instanceId}
              draggable={!player.isJailed}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', coupon.instanceId);
              }}
              style={{
                width: '100px',
                height: '140px',
                backgroundColor: coupon.color,
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px',
                color: '#fff',
                cursor: player.isJailed ? 'not-allowed' : 'grab',
                userSelect: 'none'
              }}
              whileHover={!player.isJailed ? { scale: 1.05, y: -10 } : {}}
              whileTap={!player.isJailed ? { scale: 0.95, cursor: 'grabbing' } : {}}
            >
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', textShadow: '1px 1px 0 rgba(0,0,0,0.5)', textAlign: 'center' }}>{coupon.name}</div>
              <div style={{ fontSize: '3rem', textAlign: 'center' }}>{coupon.icon}</div>
              <div style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '5px', textAlign: 'center' }}>{coupon.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
