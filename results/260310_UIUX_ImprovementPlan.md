Date: 2026-03-10 13:40:00
Author: Antigravity

# 🏥 숨표(Sumpyo) AI: UI/UX 개선 계획서

## 1. 개요
'숨표 AI'의 핵심 철학인 **"모바일 네이티브 환경에서 구현하는 가장 따뜻한 디지털 위로"**를 극대화하기 위해 **뉴모피즘(Neumorphism)** 스타일을 도입하고, 인터랙션 및 애니메이션을 강화합니다.

## 2. 디자인 전략
- **Style Concept**: Neumorphism (Soft UI)
- **Primary Color**: Cyan 600 (#0891B2)
- **Background**: Cyan 50 (#ECFEFF) / warmWhite (#F9F8F6)
- **Typography**: Lora (Heading), Raleway (Body) - NanumMyeongjo (KR Heading), Pretendard (KR Body)
- **Iconography**: Emoji 제거 -> Lucide Icons 도입

## 3. 주요 개선 사항

### 3.1. Tailwind Configuration (tailwind.config.js)
- Cyan 계열 색상 추가 (Cyan 50, 600, 950)
- Neumorphism을 위한 커스텀 Shadow 유틸리티 정의
  - `shadow-neumo-flat`: 평면형 뉴모피즘
  - `shadow-neumo-pressed`: 눌린 형태의 뉴모피즘

### 3.2. Global Style (global.css)
- 기본 폰트 패밀리 및 줄 간격(1.5~1.75) 설정
- 뷰포트 기반 기본 패딩 및 마진 정규화

### 3.3. Component Refactoring
- **PharmacyScreen (app/(tabs)/index.tsx)**
  - FloatingPharmacist: 🧑‍⚕️ 이모지 -> `HeartPulse` Lucide 아이콘으로 변경
  - 버튼: `bg-sageGreen` -> Cyan 계열 뉴모피즘 버튼으로 변경
- **StyleSelector (src/components/Prescription/StyleSelector.tsx)**
  - 선택된 스타일 카드에 `shadow-neumo-pressed` 효과 적용
- **WorryInput (src/components/Prescription/WorryInput.tsx)**
  - 입력창 영역에 부드러운 인셋 섀도우 적용하여 입체감 부여
- **PrescriptionCard (src/components/Prescription/PrescriptionCard.tsx)**
  - 카드의 모서리 라운딩(12-16px) 및 뉴모피즘 섀도우 적용

### 3.4. Animation & Interaction
- Reanimated를 사용한 부드러운 상태 전환 애니메이션 (150-300ms)
- 버튼 탭 시 미세한 스케일 다운 및 섀도우 변화(눌림 효과)

## 4. 검증 계획
- **Visual Check**: 뉴모피즘 효과가 너무 과하지 않고 텍스트 가독성(4.5:1 대비)이 유지되는지 확인
- **Performance Check**: Reanimated를 사용하여 60fps 유동성 유지 확인
- **Build Check**: `npx expo start`를 통해 컴파일 에러 여부 확인

---
Author: Antigravity
