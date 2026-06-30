import { create } from 'zustand';


const COUPON_TYPES = [
  { id: 'c_speed', name: '도핑 쿠폰', type: 'SPEED_UP', desc: '이동 거리 +2', color: '#ff4757', icon: '🥕' },
  { id: 'c_stun', name: '바나나 껍질', type: 'STUN', desc: '이동 불가(스턴)', color: '#eccc68', icon: '🍌' },
  { id: 'c_anon', name: '익명 베팅권', type: 'ANON_BET', desc: '비밀 자금 베팅', color: '#2ed573', icon: '💰' },
  { id: 'c_cctv', name: 'CCTV 조회권', type: 'CCTV', desc: '사용자 확인', color: '#1e90ff', icon: '🔍' }
];

const generateRandomCoupons = (count) => {
  return Array.from({ length: count }).map(() => {
    const randomType = COUPON_TYPES[Math.floor(Math.random() * COUPON_TYPES.length)];
    return { ...randomType, instanceId: Math.random().toString(36).substring(2, 9) };
  });
};

const INITIAL_HORSES = [
  { id: 'h1', name: '적토마', position: 0, color: '#ff6b81', sprite: '/assets/horses/1.png', coupons: [] },
  { id: 'h2', name: '번개', position: 0, color: '#7bed9f', sprite: '/assets/horses/2.png', coupons: [] },
  { id: 'h3', name: '바람', position: 0, color: '#70a1ff', sprite: '/assets/horses/3.png', coupons: [] },
  { id: 'h4', name: '흑왕', position: 0, color: '#a4b0be', sprite: '/assets/horses/4.png', coupons: [] },
  { id: 'h5', name: '백설', position: 0, color: '#ffffff', sprite: '/assets/horses/5.png', coupons: [] },
  { id: 'h6', name: '청룡', position: 0, color: '#1e90ff', sprite: '/assets/horses/6.png', coupons: [] },
  { id: 'h7', name: '황금', position: 0, color: '#ffd700', sprite: '/assets/horses/7.png', coupons: [] },
  { id: 'h8', name: '불꽃', position: 0, color: '#ff4500', sprite: '/assets/horses/8.png', coupons: [] },
];

export const useGameStore = create((set, get) => ({
  gameState: 'LOBBY',
  round: 1,

  horses: [...INITIAL_HORSES],

  player: {
    id: 'PLAYER',
    name: '나 (고양이)',
    role: 'CITIZEN',
    score: 1000,
    inventory: [],
    isJailed: false,
    avatar: '/assets/avatars/cat.png'
  },
  aiPlayers: [
    { id: 'AI_1', name: '부엉이', role: 'MAFIA', score: 1000, inventory: [], isJailed: false, avatar: '/assets/avatars/owl.png' },
    { id: 'AI_2', name: '악마', role: 'CITIZEN', score: 1000, inventory: [], isJailed: false, avatar: '/assets/avatars/demon.png' },
    { id: 'AI_3', name: '곰', role: 'CITIZEN', score: 1000, inventory: [], isJailed: false, avatar: '/assets/avatars/bear.png' },
    { id: 'AI_4', name: '소', role: 'MAFIA', score: 1000, inventory: [], isJailed: false, avatar: '/assets/avatars/cow.png' },
  ],

  chatMessages: [{ sender: 'System', text: 'CouponGo에 오신 것을 환영합니다.' }],

  votes: {},

  startGame: () => {
    set({
      gameState: 'BETTING',
      round: 1,
      horses: INITIAL_HORSES.map(h => ({ ...h, position: 0, coupons: [] })),
      player: { ...get().player, inventory: generateRandomCoupons(3), isJailed: false },
      aiPlayers: get().aiPlayers.map(ai => ({ ...ai, inventory: generateRandomCoupons(3), isJailed: false })),
      chatMessages: [{ sender: 'System', text: '1라운드가 시작되었습니다. 마음에 드는 말에게 쿠폰을 베팅하세요!' }]
    });
  },

  addChatMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),


  playCoupon: (horseId, couponInstanceId, isPlayer = true) => {
    const state = get();
    if (state.gameState !== 'BETTING') return;

    if (isPlayer) {
      if (state.player.isJailed) return;

      const inventory = [...state.player.inventory];
      const couponIndex = inventory.findIndex(c => c.instanceId === couponInstanceId);

      if (couponIndex !== -1) {
        const coupon = inventory[couponIndex];
        inventory.splice(couponIndex, 1);

        const updatedHorses = state.horses.map(h => {
          if (h.id === horseId) {
            return { ...h, coupons: [...h.coupons, { ...coupon, owner: 'PLAYER', isHidden: true }] };
          }
          return h;
        });

        set({
          player: { ...state.player, inventory },
          horses: updatedHorses
        });

        get().addChatMessage({ sender: 'System', text: `당신이 ${updatedHorses.find(h=>h.id===horseId).name}에게 쿠폰을 냈습니다.` });
      }
    }
  },

  simulateAIBetting: () => {
    const state = get();
    let updatedHorses = [...state.horses];
    let updatedAIs = [...state.aiPlayers];

    updatedAIs.forEach(ai => {
      if (ai.isJailed || ai.inventory.length === 0) return;


      const horseIndex = Math.floor(Math.random() * updatedHorses.length);
      const couponIndex = Math.floor(Math.random() * ai.inventory.length);

      const coupon = ai.inventory[couponIndex];
      ai.inventory.splice(couponIndex, 1);

      updatedHorses[horseIndex].coupons.push({ ...coupon, owner: ai.id, isHidden: true });
    });

    set({ horses: updatedHorses, aiPlayers: updatedAIs });
    get().addChatMessage({ sender: 'System', text: 'AI들이 쿠폰 베팅을 마쳤습니다.' });
  },


  startRacingPhase: () => {
    set({ gameState: 'RACING' });

    const revealedHorses = get().horses.map(h => ({
      ...h,
      coupons: h.coupons.map(c => ({ ...c, isHidden: false }))
    }));
    set({ horses: revealedHorses });
    get().addChatMessage({ sender: 'System', text: '레이스가 시작됩니다! 쿠폰이 공개됩니다.' });
  },


  simulateRaceStep: () => {
    let effectMessages = [];

    const updatedHorses = get().horses.map(h => {
      let speed = Math.floor(Math.random() * 15) + 5;

      const hasStun = h.coupons.some(c => c.type === 'STUN');
      if (hasStun) {
        speed = 0;
        if (h.position === 0) effectMessages.push(`${h.name}이(가) 바나나를 밟아 기절했습니다! (이동불가)`);
      }

      const speedUps = h.coupons.filter(c => c.type === 'SPEED_UP').length;
      if (speedUps > 0) {
        speed += speedUps * 10;
        if (h.position === 0) effectMessages.push(`${h.name}이(가) 도핑 쿠폰으로 폭발적인 속도를 냅니다!`);
      }

      return { ...h, position: Math.min(100, h.position + speed) };
    });

    set({ horses: updatedHorses });


    if (get().horses[0].position === 0 && effectMessages.length > 0) {
      effectMessages.forEach(msg => get().addChatMessage({ sender: 'System', text: msg }));
    }

    if (updatedHorses.some(h => h.position >= 100)) {
      get().addChatMessage({ sender: 'System', text: '결승선 통과! 회의 시간입니다.' });
      setTimeout(() => get().startVotingPhase(), 2000);
    }
  },


  startVotingPhase: () => {
    set({ gameState: 'VOTING', votes: {} });
    get().addChatMessage({ sender: 'System', text: '긴급 회의! 조작 의심자를 투표하세요.' });
  },


  castVote: (targetId) => {
    const state = get();
    if (state.gameState !== 'VOTING') return;

    const votes = { ...state.votes, PLAYER: targetId };


    state.aiPlayers.forEach(ai => {
      const randomTarget = [...state.aiPlayers.map(a=>a.id), 'PLAYER'][Math.floor(Math.random() * 5)];
      votes[ai.id] = randomTarget;
    });

    set({ votes });
    get().resolveVoting();
  },

  resolveVoting: () => {
    const state = get();
    const voteCounts = Object.values(state.votes).reduce((acc, target) => {
      acc[target] = (acc[target] || 0) + 1;
      return acc;
    }, {});

    const maxVotes = Math.max(...Object.values(voteCounts));
    const jailedIds = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);

    get().addChatMessage({ sender: 'System', text: `투표 결과 확정! 패널티 대상: ${jailedIds.join(', ')}` });

    const updatedAIs = state.aiPlayers.map(ai =>
      jailedIds.includes(ai.id) ? { ...ai, isJailed: true } : ai
    );
    const updatedPlayer = jailedIds.includes('PLAYER') ? { ...state.player, isJailed: true } : state.player;

    set({ aiPlayers: updatedAIs, player: updatedPlayer });


    setTimeout(() => {
      if (state.round >= 5) {
        set({ gameState: 'GAMEOVER' });
      } else {
        set(s => ({
          gameState: 'BETTING',
          round: s.round + 1,
          horses: s.horses.map(h => ({ ...h, position: 0, coupons: [] })),
          player: { ...s.player, inventory: generateRandomCoupons(3) },
          aiPlayers: s.aiPlayers.map(ai => ({ ...ai, inventory: generateRandomCoupons(3) })),
          votes: {}
        }));
        get().addChatMessage({ sender: 'System', text: `${state.round + 1}라운드가 시작되었습니다.` });
      }
    }, 4000);
  }
}));
