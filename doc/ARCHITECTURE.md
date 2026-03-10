Date: 2026-03-10 15:30:00
Author: Antigravity

# 🏗️ 숨표(Sumpyo) AI - 앱 시스템 아키텍처

"따뜻한 위로를 전달하는 모바일 네이티브 감성 AI 서비스의 구조"

## 1. 기술 스택 (Tech Stack)

- **Framework**: Expo SDK 55 (React Native)
- **Routing**: Expo Router (File-based Routing)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Animations**: React Native Reanimated 4.x
- **Icons**: Lucide React Native
- **AI Engine**: Google Gemini 1.5 Flash (via `@google/generative-ai`)
- **State Management**: Zustand 5.x
- **Persistence**: Zustand Persist + `expo-secure-store` (Encrypted Local Storage)
- **Database (Planned)**: Supabase (PostgreSQL + Auth)

## 2. 디렉터리 구조 (Directory Structure)

```text
sumpyo-ai-app/
├── app/                    # Expo Router 기반 화면 (Tabs, Layout)
│   ├── (tabs)/             # 메인 탭 그룹
│   │   ├── index.tsx       # 심야의 약방 (고민 입력 & 조제)
│   │   └── two.tsx         # 나만의 약장 (처방전 기록)
│   └── _layout.tsx         # 전역 레이아웃 및 폰트/스타일 초기화
├── src/
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   └── Prescription/   # 처방전 관련 전용 컴포넌트
│   ├── services/           # 외부 API 연동 (Gemini, Supabase)
│   ├── store/              # 전역 상태 관리 및 영속성 레이어
│   └── hooks/              # 커스텀 훅 (TBD)
├── assets/                 # 이미지, 폰트 등 정적 자원
├── constants/              # 테마 컬러, 공통 설정
└── doc/                    # 기술 및 기획 문서
```

## 3. 핵심 데이터 흐름 (Data Flow)

### A. 처방전 조제 프로세스 (The Alchemy Flow)

1.  **Input**: 사용자가 `index.tsx`에서 고민 텍스트를 입력.
2.  **Selection**: 3가지 조제 스타일(공감 F / 이성 T / 온기 W) 중 하나를 선택.
3.  **Request**: `src/services/ai.ts`가 Gemini 1.5 Flash에 특화된 프롬프트를 전송.
4.  **Response**: AI가 JSON 형식의 처방전(제목, 내용, 명언)을 반환.
5.  **Storage**: `usePrescriptionStore`를 통해 암호화된 로컬 스토리지에 자동 저장.
6.  **UI**: `PrescriptionCard` 컴포넌트가 Reanimated 애니메이션과 함께 처방전 노출.

### B. 로컬 데이터 관리 (Offline-First)

- 사용자의 모든 처방 기록은 `expo-secure-store`를 통해 로컬 기기에 안전하게 보관됩니다.
- 네트워크 연결이 끊긴 상태에서도 '나만의 약장' 탭에서 이전 기록을 열람할 수 있습니다.

## 4. 모바일 최적화 및 안정성 (Reliability)

- **Babel/Metro Config**: NativeWind v4와 Reanimated 4.x의 충돌을 방지하기 위한 특수 설정(`jsxImportSource`, `react-native-reanimated/plugin`)이 적용되어 있습니다.
- **Error Handling**: AI 호출 실패 시 '쉬어가는 시간'이라는 부드러운 대체 처방 메시지를 제공하여 사용자 경험을 보호합니다.
- **Performance**: 모든 UI 전환 및 리스트 렌더링에 Reanimated를 사용하여 60fps의 부드러움을 보장합니다.
