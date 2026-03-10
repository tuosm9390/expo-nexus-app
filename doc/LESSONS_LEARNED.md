Date: 2026-03-10 15:50:00
Author: Antigravity

# 📝 Lessons Learned: 숨표(Sumpyo) AI 개발 교훈

작업 중 발생한 기술적 난관과 이를 통해 얻은 핵심 인사이트를 기록합니다.

## 1. Expo SDK 55 + NativeWind v4 + Reanimated 4.x 환경 설정

- **이슈**: Metro 번들링 시 `.plugins is not a valid Plugin property` 에러 발생.
- **원인**: NativeWind v4는 Babel 플러그인(`nativewind/babel`)을 통해 스타일을 생성하는데, 이를 `plugins` 배열에 넣을 경우 일부 환경에서 객체 구조를 잘못 인식하는 문제 발생.
- **해결**: `babel.config.js`의 **`presets`** 배열에 `nativewind/babel`을 포함시켜 해결.
- **교훈**: 최신 라이브러리 간의 조합 시 공식 문서의 "플러그인" 명칭과 실제 Babel 설정 상의 위치(preset vs plugin)가 다를 수 있음을 항상 유의해야 함.

## 2. Gemini SDK의 import.meta 호환성

- **이슈**: Web 환경에서 `Uncaught SyntaxError: Cannot use 'import.meta' outside a module` 발생.
- **원인**: `@google/generative-ai` 내부에서 `import.meta`를 사용하지만, Metro 번들러가 이를 일반 스크립트로 처리하려 함.
- **해결**: `babel-plugin-transform-import-meta` 설치 및 Babel 플러그인 추가.
- **교훈**: 최신 ESM 전용 라이브러리를 Expo Web에서 사용할 때는 반드시 Babel 트랜스파일러 설정을 보완해야 함.

## 3. Tailwind CSS v4 vs v3 설정 충돌

- **이슈**: `global.css`에서 `@import "tailwindcss";` 사용 시 번들링 성공해도 스타일이 적용되지 않음.
- **원인**: 현재 `package.json`에 설치된 `tailwindcss` 버전이 `3.4.1`임에도 불구하고 v4 문법을 사용함.
- **해결**: `@tailwind base;` 등 v3 표준 문법으로 복구하고, `tailwind.config.js`에 `presets: [require("nativewind/preset")]` 필수 포함.
- **교훈**: CSS 프레임워크의 메이저 버전 차이에 따른 문법 변화를 패키지 버전과 대조하여 엄격히 확인해야 함.

- [UI/UX] Neumorphism 스타일을 적용할 때 그림자의 색상과 대비를 섬세하게 조절하여 접근성(최소 4.5:1 대비)을 유지하는 것이 중요하다.
