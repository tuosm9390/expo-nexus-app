/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        warmWhite: '#F9F8F6',
        sageGreen: '#B7C9B0',
        muteBlue: '#A1B5C1',
        softCharcoal: '#4A4A4A',
        // Cyan-based Palette from ui-ux-pro-max
        cyan50: '#ECFEFF',
        cyan100: '#CFFAFE',
        cyan600: '#0891B2',
        cyan950: '#164E63',
        emerald600: '#059669',
      },
      fontFamily: {
        pretendard: ['Pretendard-Regular'],
        pretendardBold: ['Pretendard-Bold'],
        nanumMyeongjo: ['NanumMyeongjo-Regular'],
        nanumMyeongjoBold: ['NanumMyeongjo-Bold'],
        montserrat: ['Montserrat-Regular'],
        montserratBold: ['Montserrat-Bold'],
      },
      boxShadow: {
        // Neumorphism Shadows (for Web)
        'neumo-flat': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neumo-pressed': 'inset 5px 5px 15px #d1d9e6, inset -5px -5px 15px #ffffff',
      },
    },
  },
  plugins: [],
};
