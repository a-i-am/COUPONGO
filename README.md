# COUPONGO

[한국어](#한국어) | [English](#english)

## 한국어

경마의 베팅과 마피아 게임의 심리전을 결합한 웹 보드게임입니다. 플레이어는 쿠폰으로 경주 결과에 개입하고, 매 라운드 투표로 승부조작 세력을 추리합니다.

### 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| 개발 기간 | 2026-06-30 - 진행 중 |
| 리팩터링 | 기존 서비스와 이름만 공유하는 전면 재기획·재개발 |
| 인원 | 1인 |
| 상태 | 플레이 가능한 로컬 프로토타입 개발 중 |

### 현재 구현

- 5라운드 게임 상태와 로비·게임오버 흐름
- 쿠폰 투하, 자동 레이스, 긴급 투표의 3단계 루프
- 도핑, 스턴, 익명 베팅, CCTV 쿠폰 데이터
- AI 플레이어의 쿠폰 사용과 투표
- Framer Motion 기반 카드·레이스·투표 연출
- Zustand 기반 게임 상태 관리

### 기획 목표

- 마피아는 지정된 말을 의도한 순위로 조작
- 시민은 조작을 추리하며 높은 배당의 말을 우승시킴
- 쿠폰은 비공개로 배치되고 레이스 시작 시 공개
- 투표 대상은 탈락하지 않고 다음 라운드 행동 제약을 받음

현재 구현은 로컬 AI 대전입니다. 네트워크 멀티플레이는 구현된 기능으로 표기하지 않습니다.

### 기술 스택

`React 19` `Vite 8` `Zustand 5` `Framer Motion` `Lucide React`

### 실행

```bash
cd frontend
npm ci
npm run dev
```

### 에셋 출처

- Horse Pack: loota9, CC BY 4.0
- Noto Serif: SIL Open Font License 1.1
- 출처와 재배포 조건이 확인되지 않은 원본 에셋은 공개 커밋에서 제외

### 다음 업데이트

- 진영별 승리 조건과 최종 정산
- 익명 베팅과 CCTV 쿠폰의 실제 효과
- 투표 패널티의 다음 라운드 적용
- 5라운드 완주 회귀 테스트

## English

COUPONGO is a web board game combining horse-race betting with the social deduction of a mafia game. Players influence a race with hidden coupons and vote on suspected manipulators after each round.

### Project

- Development: 2026-06-30 - Present
- Team: Solo
- Status: Local playable prototype in active development
- This is a complete redesign that only reuses the old project name.

### Current Implementation

- Five-round lobby, gameplay, and game-over state flow
- Hidden coupon placement, automatic racing, and emergency voting
- AI coupon use and voting
- Zustand state management and Framer Motion presentation
- Local AI play only; network multiplayer is not implemented

### Design Goals

- Mafia players manipulate a designated horse toward a target rank.
- Citizens infer manipulation while trying to make high-odds horses win.
- Coupons remain hidden until the race begins.
- Voting restricts a suspect's next-round actions instead of eliminating the player.

### Stack and Assets

`React 19` `Vite 8` `Zustand 5` `Framer Motion` `Lucide React`

- Horse Pack: loota9, CC BY 4.0
- Noto Serif: SIL Open Font License 1.1
- Assets without verified source and redistribution terms are excluded from public commits.

### Run

```bash
cd frontend
npm ci
npm run dev
```

### Next Updates

- Faction-specific win conditions and final scoring
- Functional anonymous-betting and CCTV coupons
- Next-round voting penalties
- Five-round regression coverage
