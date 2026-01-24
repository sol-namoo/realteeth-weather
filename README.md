# Realteeth Weather

## 프로젝트 실행 방법

1) 의존성 설치
```bash
npm install
```

2) 환경 변수 설정
```bash
export NEXT_PUBLIC_OPENWEATHER_KEY=YOUR_KEY
export NEXT_PUBLIC_KAKAO_REST_KEY=YOUR_KEY
```

3) 개발 서버 실행
```bash
npm run dev
```

## 구현한 기능
- 현재 위치 기반 날씨 조회 (현재/최저/최고/시간대)
- 위치 검색 및 검색 결과 상세 페이지 이동
- 즐겨찾기 최대 6개 등록/해제 및 별칭 수정
- 즐겨찾기 카드에서 요약 날씨 병렬 로딩

## 기술적 의사결정 및 이유
- Next.js App Router 사용: 라우팅/서버 라우트 구성이 단순하고 API 라우트 분리가 쉬움
- TanStack Query 사용: 데이터 캐싱/병렬 요청/상태 관리를 일관된 패턴으로 처리
- 즐겨찾기 요약 API 분리: 카드 렌더에 필요한 최소 데이터만 받아 트래픽 절감
- UI 공통 컴포넌트 분리: Card/Input/Button/ModalLayout로 반복 UI 스타일 통합

## 사용한 기술 스택
- Next.js 15 (App Router)
- React 19
- TypeScript
- TanStack Query
- Tailwind CSS
- ESLint / Prettier
