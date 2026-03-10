Date: 2026-03-10 15:52:00
Author: Antigravity

# ⚠️ Common Mistakes: 숨표(Sumpyo) AI 개발 시 주의사항

반복적으로 발생할 수 있는 실수와 이를 방지하기 위한 가이드입니다.

## 1. NativeWind v4 프리셋 누락

- **실수**: `tailwind.config.js`에 `presets: [require("nativewind/preset")]`를 넣지 않음.
- **결과**: 빌드는 성공하는 듯 보이나 스타일이 전혀 적용되지 않거나, `withNativeWind` 설정 시 원인 불명의 에러 발생.
- **방지**: NativeWind v4를 사용할 때는 반드시 Tailwind 설정의 첫 번째 프리셋으로 추가할 것.

## 2. Reanimated 4.x Worklets 플러그인 중복

- **실수**: `babel.config.js`에 `react-native-worklets/plugin`과 `react-native-reanimated/plugin`을 둘 다 넣음.
- **결과**: `Duplicate plugin/preset detected` 에러와 함께 번들링 실패.
- **방지**: 최신 Reanimated 4.x에서는 `react-native-reanimated/plugin` 하나만으로 충분하며, 중복 선언 시 Babel이 충돌을 일으킴.

## 3. Expo 환경 변수 접두사 오기

- **실수**: `.env` 파일에 `GEMINI_API_KEY`와 같이 작성 (EXPO*PUBLIC* 생략).
- **결과**: 클라이언트 코드에서 `process.env`를 통해 접근 시 `undefined` 반환.
- **방지**: Expo 앱에서 런타임에 접근해야 하는 모든 키는 반드시 **`EXPO_PUBLIC_`** 접두사를 붙여야 함.

- PowerShell 환경에서 (tabs)와 같은 폴더명이 포함된 경로를 처리할 때 따옴표를 빠뜨려 명령어 실행 오류가 발생하는 경우.
