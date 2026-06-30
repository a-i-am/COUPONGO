import React, { useState } from 'react';
import { useGameStore } from '../store';
import { motion } from 'framer-motion';

export function Hand() {
  const inventory = useGameStore(state => state.player.inventory);
  const gameState = useGameStore(state => state.gameState);
  const useCard = useGameStore(state => state.useCard);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (gameState === 'LOBBY' || inventory.length === 0) return null;

  const totalCards = inventory.length;
  const maxArcAngle = 30;
  const spacing = Math.min(100, 400 / totalCards);

  const handleDragEnd = (event, info, cardId) => {

    if (info.offset.y < -150) {
      useCard(cardId);
      setHoveredIndex(null);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: -40,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      width: '100%',
      height: '300px',
      pointerEvents: 'none',
      perspective: '1000px'
    }}>
      <div style={{
        position: 'absolute',
        top: '-300px',
        width: '800px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to top, transparent, rgba(74, 222, 128, 0.1))',
        borderTop: '2px dashed rgba(74, 222, 128, 0.5)',
        color: 'rgba(74, 222, 128, 0.8)',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        pointerEvents: 'none',
        opacity: hoveredIndex !== null ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        위로 던져서 사용하기
      </div>

      {inventory.map((card, i) => {
        const centerIndex = (totalCards - 1) / 2;
        const offset = i - centerIndex;


        const rotateZ = totalCards > 1 ? (offset / centerIndex) * maxArcAngle : 0;
        const translateY = Math.abs(offset) * Math.abs(offset) * 4;
        const translateX = offset * spacing;

        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

        return (
          <motion.div
            key={card.id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={(e, info) => handleDragEnd(e, info, card.id)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              rotateZ: isHovered ? 0 : rotateZ,
              y: isHovered ? -120 : translateY,
              x: isHovered ? translateX : translateX,
              scale: isHovered ? 1.5 : (isOtherHovered ? 0.9 : 1),
              zIndex: isHovered ? 50 : i
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              width: '160px',
              height: '200px',
              background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
              border: '3px solid #b8860b',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: isHovered ? '0 0 30px rgba(184, 134, 11, 0.8)' : '0 10px 20px rgba(0,0,0,0.5)',
              pointerEvents: 'auto',
              cursor: 'grab',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: 'white',
              transformOrigin: 'bottom center',
              userSelect: 'none'
            }}
            whileDrag={{ cursor: 'grabbing', zIndex: 100, scale: 1.2, rotateZ: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{
                  background: '#2563eb',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.8), 0 0 5px black',
                  marginLeft: '-15px',
                  marginTop: '-15px',
                  border: '2px solid white'
               }}>
                  {card.type === 'sub' ? `-${card.value}` :
                   card.type === 'add' ? `+${card.value}` :
                   card.type === 'mult' ? `x${card.value}` : `/2`}
               </div>

               <div style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  textShadow: '1px 1px 2px black',
                  borderBottom: '1px solid #444',
                  paddingBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
               }}>
                  {card.name}
               </div>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', margin: '8px 0', borderRadius: '4px', border: '1px solid #444' }}>
            </div>
            <div style={{
               background: '#e5e7eb',
               color: '#1f2937',
               padding: '6px',
               borderRadius: '4px',
               fontSize: '0.75rem',
               textAlign: 'center',
               fontWeight: 'bold',
               minHeight: '40px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)'
            }}>
               {card.description}
            </div>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              boxShadow: `inset 0 0 20px ${
                card.type === 'add' || card.type === 'mult' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'
              }`,
              borderRadius: '8px',
              pointerEvents: 'none'
            }} />
          </motion.div>
        );
      })}
    </div>
  );
}
