import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { LoaderPinwheel } from 'lucide-react-native';

const DOT_COUNT = 3;

function BouncingDot({ delay }: { delay: number }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="w-1.5 h-1.5 rounded-full bg-cyan600 mx-1"
    />
  );
}

export function BrewingAnimation() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="flex-1 items-center justify-center py-12 bg-cyan50">
      <Animated.View style={animatedStyle} className="mb-8 p-6 bg-white rounded-full shadow-sm">
        <LoaderPinwheel size={48} color="#0891B2" strokeWidth={1.5} />
      </Animated.View>
      
      <Text className="text-cyan950 text-xl font-bold mb-3">
        마음을 읽고 있어요...
      </Text>
      <Text className="text-cyan600 opacity-60 text-base mb-10 text-center px-12 leading-6 font-medium">
        당신의 고민을 꼼꼼히 살피며{'\n'}따뜻한 처방전을 조제하는 중입니다
      </Text>
      
      <View className="flex-row items-center justify-center">
        {Array.from({ length: DOT_COUNT }, (_, i) => (
          <BouncingDot key={i} delay={i * 200} />
        ))}
      </View>
    </View>
  );
}
