# 🏥 숨표(Sumpyo) AI - 마음의 쉼표 (Mobile App)

**"심야의 약방에서 전하는 가장 따뜻한 디지털 처방전"**

숨표 AI는 지친 현대인들을 위해 Google Gemini AI가 개인화된 감성 처방전을 조제해주는 모바일 애플리케이션입니다. 아날로그의 포근한 감성과 모바일의 부드러운 사용성을 결합하여 일상의 작은 쉼표를 선물합니다.

## ✨ 주요 기능 (Key Features)

- **심야의 약방 (Midnight Pharmacy)**: 오늘 하루 힘들었던 일이나 고민을 털어놓으면 AI 약사가 정성스럽게 처방전을 조제합니다.
- **3대 조제 스타일 (Persona)**: 사용자의 기분에 따라 **공감(F)**, **이성(T)**, **온기(W)** 스타일의 처방을 선택할 수 있습니다.
- **디지털 처방전 (Digital Prescription)**: 시적인 제목, 다정한 위로 문구, 그리고 가슴에 남는 명언이 담긴 아름다운 카드 형식의 처방전을 제공합니다.
- **나만의 약장 (Personal Cabinet)**: 과거에 받은 소중한 처방전들을 날짜별로 안전하게 보관하고 언제든 다시 꺼내볼 수 있습니다.
- **오프라인 우선 (Offline-First)**: 모든 기록은 기기에 암호화되어 저장되므로, 네트워크 연결 없이도 나만의 기록을 열람할 수 있습니다.

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React Native (Expo SDK 55)
- **Language**: TypeScript (Strict Mode)
- **Styling**: NativeWind v4 (Tailwind CSS)
- **Animations**: React Native Reanimated 4.x
- **AI Engine**: Google Gemini 1.5 Flash
- **State**: Zustand 5.x + expo-secure-store
- **Backend**: Supabase (Planned)

## 🚀 시작하기 (Getting Started)

1.  **환경 변수 설정**:
    프로젝트 루트에 `.env` 파일을 생성하고 아래 키를 입력하세요.

    ```text
    EXPO_PUBLIC_GEMINI_API_KEY=your_key
    EXPO_PUBLIC_SUPABASE_URL=your_url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

2.  **의존성 설치**:

    ```bash
    npm install
    ```

3.  **앱 실행**:
    ```bash
    npx expo start -c
    ```

## 📚 관련 문서 (Documentation)

- [시스템 아키텍처 (ARCHITECTURE.md)](./doc/ARCHITECTURE.md)
- [지능형 조제 로직 (AI_LOGIC.md)](./doc/AI_LOGIC.md)
- [데이터 설계 가이드 (DATABASE.md)](./doc/DATABASE.md)
- [UI/UX 디자인 원칙 (UI_UX_GUIDE.md)](./doc/UI_UX_GUIDE.md)
- [향후 개발 계획서 (Future Plan)](./doc/results/260310_FutureDevelopmentPlan_SumpyoAI_App.md)

---

**Author**: Antigravity  
**Date**: 2026-03-10
