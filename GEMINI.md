Date: 2026-03-10 13:40:00
Author: Antigravity

# 🏥 숨표(Sumpyo) AI: 마음의 쉼표 (Mobile App Hub)

**"모바일 네이티브 환경에서 구현하는 가장 따뜻한 디지털 위로"**

---

## 🍌 프로젝트 핵심 철학 (Mobile Philosophy)

- **네이티브 감성 (Native Sensibility)**: 60fps의 끊김 없는 부드러운 애니메이션(`Reanimated`)으로 사용자의 긴장을 완화합니다.
- **햅틱 피드백 (Haptic Experience)**: 처방전 발행 시 미세한 진동을 통해 실제 약을 받은 듯한 촉각적 경험을 제공합니다.
- **상시 연결 (Constant Connection)**: 푸시 알림을 통해 외로운 순간, AI 약사가 가장 먼저 손을 내미는 따뜻한 소통 창구를 구축합니다.

---

## ⚙️ 문제 해결 완료 후 필수 워크플로우 (Post-Problem-Solving Workflow)

**모든 문제 해결이 완료된 직후, 사용자 승인 없이 아래 절차를 자동으로 실행한다.**

1. **회고 분석**: 이번 작업에서 "무엇이 작동했고 무엇이 실패했는지" 분석.
2. **핵심 규칙 도출**: 향후 동일 실수를 반복하지 않기 위한 규칙 1가지 도출.
3. **COMMON_MISTAKES.md 저장**: `doc/COMMON_MISTAKES.md`에 업데이트.
4. **LESSONS_LEARNED 저장**: `doc/LESSONS_LEARNED.md` 하단에 규칙 추가.
5. **보고**: 저장 완료 후 사용자에게 요약 보고.

---

## 📜 코딩 스타일 및 앱 개발 원칙 (App Development Principles)

- **성능 우선 애니메이션**: 모든 UI 인터랙션은 `React Native Reanimated`를 사용하여 메인 스레드 부하를 최소화한다.
- **모바일 스타일링**: `NativeWind`를 사용하여 Tailwind CSS의 생산성을 모바일 네이티브 환경에서 유지한다.
- **오프라인 우선 (Offline-First)**: 이전에 받은 처방전은 로컬 스토리지에 캐싱하여 네트워크 연결이 끊겨도 언제든 열어볼 수 있게 한다.
- **엄격한 타입 안전성**: TypeScript를 사용하며 `any` 타입을 절대 금지한다. `Zod`를 통해 모든 API 경계의 데이터를 검증한다.

---

## 🚀 주요 커맨드 (App Commands)

```bash
npx expo start        # 개발 서버 및 메트로 번들러 실행 (QR 코드 출력)
npm run android       # 안드로이드 에뮬레이터 실행
npm run ios           # iOS 시뮬레이터 실행 (macOS 필요)
npm run web           # 웹 브라우저 실행
```

## 📚 관련 기술 문서 (App Architecture Modules)

| 문서명                   | 설명                                        |
| ------------------------ | ------------------------------------------- |
| `doc/ARCHITECTURE.md`    | Expo Router 기반 앱 아키텍처 및 데이터 흐름 |
| `doc/DATABASE.md`        | Supabase 스키마 및 모바일 특화 RLS 정책     |
| `doc/AI_LOGIC.md`        | 감정 분석 및 스타일별 프롬프트 전략         |
| `doc/UI_UX_GUIDE.md`     | 모바일 특화 디자인 및 Reanimated 가이드     |
| `doc/LESSONS_LEARNED.md` | 앱 개발 중 학습한 교훈 및 규칙 아카이브     |
