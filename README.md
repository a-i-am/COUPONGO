# COUPONGO

- 경마 시스템과 마피아 게임의 추리 요소를 결합한 웹 보드게임입니다.
- 플레이어는 쿠폰을 사용해 경주 결과에 개입하며, 라운드마다 진행되는 투표를 통해 승부조작 세력을 찾아내야 합니다.

README 업데이트: 2026-07-01

> 📷 **영상 및 이미지**
> *(여기에 영상 또는 이미지 추가 예정)*

### 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| 개발 기간 | 2026-06-30 - 진행 중 |
| 리팩터링 이력 | (진행 시 추가 예정) |
| 인원 | 1인 |
| 진행 단계 | 플레이 가능한 로컬 프로토타입 개발 중 |

### 기술 스택
<p>
  <img src="https://img.shields.io/badge/React 19-20232A?style=flat-square&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite 8-646CFF?style=flat-square&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand 5-342B24?style=flat-square"/>
  <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=flat-square&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Lucide React-F28D1A?style=flat-square"/>
</p>

### 프로젝트 구조
```text
(프로젝트 구조도 추가 예정)
```

### 플레이 및 조작 방법
*(플레이어 턴 진행, 마우스 조작 등 상세한 플레이 방법 작성 예정)*

### 주요 용어 및 쿠폰 효과
레이스의 승패와 추리에 개입하기 위해 플레이어가 사용할 수 있는 특수 쿠폰들입니다:
- **도핑(Doping):** 타겟이 된 말의 이동 속도를 일시적으로 크게 증가시킵니다.
- **스턴(Stun):** 타겟이 된 말을 일정 시간 동안 멈추게 하여 진행을 방해합니다.
- **익명 베팅(Anonymous):** 다른 플레이어들에게 자신의 베팅 내역(누가 어떤 말에 돈을 걸었는지)을 숨깁니다.
- **CCTV:** 의심되는 다른 플레이어가 비공개로 배치한 쿠폰의 내역을 몰래 들여다봅니다.

### 현재 구현

- 게임 상태와 로비·게임오버 흐름
- 쿠폰 배치, 자동 레이스, 긴급 투표의 3단계 루프
- 도핑, 스턴, 익명 베팅, CCTV 쿠폰 데이터
- AI 플레이어의 쿠폰 사용과 투표
- Framer Motion 기반 카드·레이스·투표 연출
- Zustand 기반 게임 상태 관리

### 기획 목표

- 마피아는 지정된 말을 의도한 순위로 조작
- 시민은 조작을 추리하며 높은 배당의 말을 우승시킴
- 쿠폰은 비공개로 배치되고 레이스 시작 시 공개
- 투표 대상은 탈락하지 않고 다음 라운드 행동 제약을 받음

### 실행

```bash
cd frontend
npm ci
npm run dev
```

### 업데이트 계획

- 진영별 승리 조건과 최종 정산
- 익명 베팅과 CCTV 쿠폰의 실제 효과 구현
- 투표 패널티의 다음 라운드 적용
- 완주 흐름 회귀 테스트
- 사용한 에셋 출처 표기 예정
