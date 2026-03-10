import '../global.css';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const SumpyoTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ECFEFF', // Cyan 50
    card: '#ECFEFF',
    text: '#164E63', // Cyan 950
    primary: '#0891B2', // Cyan 600
    border: '#CFFAFE', // Cyan 100
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={SumpyoTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: '처방전 상세',
            headerStyle: { backgroundColor: '#ECFEFF' },
            headerTintColor: '#164E63',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
