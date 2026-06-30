import React, { useState } from 'react';
import { useGameStore } from '../store';

export function Chat() {
  const chatMessages = useGameStore(state => state.chatMessages);
  const tradeRequest = useGameStore(state => state.tradeRequest);
  const player = useGameStore(state => state.player);
  const addChatMessage = useGameStore(state => state.addChatMessage);
  const requestTrade = useGameStore(state => state.requestTrade);
  const resolveTrade = useGameStore(state => state.resolveTrade);

  const [chatInput, setChatInput] = useState('');
  const [showTradeModal, setShowTradeModal] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      addChatMessage({ sender: 'PLAYER', text: chatInput });
      setChatInput('');
    }
  };

  const handleTradeSubmit = (card) => {
    requestTrade('PLAYER', 'AI', card);
    setShowTradeModal(false);
  };

  return (
    <div style={{ position: 'absolute', bottom: 20, right: 20, width: '300px', background: 'rgba(0,0,0,0.8)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', pointerEvents: 'auto', maxHeight: '400px' }}>
      {tradeRequest && tradeRequest.to === 'PLAYER' && (
        <div style={{ padding: '1rem', background: '#ec4899', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
          <strong>{tradeRequest.from}</strong>님의 교환 신청!
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-success" style={{ flex: 1, padding: '0.5rem' }} onClick={() => resolveTrade(true)}>수락</button>
            <button className="btn btn-danger" style={{ flex: 1, padding: '0.5rem' }} onClick={() => resolveTrade(false)}>거절</button>
          </div>
        </div>
      )}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{ fontSize: '0.85rem' }}>
            <span style={{ color: msg.sender === 'System' ? '#fde047' : (msg.sender === 'PLAYER' ? '#60a5fa' : '#f87171'), fontWeight: 'bold' }}>
              [{msg.sender}]
            </span>: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', padding: '0.5rem', borderTop: '1px solid #374151' }}>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="채팅 입력..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none', outline: 'none', background: '#374151', color: 'white' }}
        />
        <button type="submit" style={{ display: 'none' }}>Send</button>
        <button
          type="button"
          className="btn"
          style={{ marginLeft: '0.5rem', background: '#8b5cf6', color: 'white', padding: '0.5rem' }}
          onClick={() => setShowTradeModal(true)}
        >
          교환
        </button>
      </form>
      {showTradeModal && (
        <div style={{ position: 'absolute', bottom: '100%', right: 0, background: '#1f2937', padding: '1rem', borderRadius: '1rem', width: '350px', marginBottom: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>상대에게 넘길 카드 선택</h3>
            <button onClick={() => setShowTradeModal(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>X</button>
          </div>
          {player.inventory.length === 0 ? (
            <p style={{ color: '#9ca3af' }}>가진 쿠폰이 없습니다.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {player.inventory.map((card, i) => (
                <button
                  key={i}
                  className="btn"
                  style={{ background: '#374151', color: 'white', textAlign: 'left', padding: '0.5rem' }}
                  onClick={() => handleTradeSubmit(card)}
                >
                  <strong>{card.name}</strong> ({card.description})
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
