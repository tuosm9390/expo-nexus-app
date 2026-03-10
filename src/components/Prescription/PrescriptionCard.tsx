import React, { useEffect } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  FadeInUp,
} from 'react-native-reanimated';
import { Quote, CalendarDays, ScrollText } from 'lucide-react-native';
import { Prescription } from '../../types/prescription';

const STYLE_LABELS: Record<Prescription['style'], string> = {
  F: '따뜻한 공감의 약',
  T: '명쾌한 이성의 약',
  W: '포근한 온기의 약',
};

const STYLE_COLORS: Record<Prescription['style'], string> = {
  F: '#0891B2', // Cyan 600
  T: '#0E7490', // Cyan 700
  W: '#065F46', // Emerald 800 (for Warmth)
};

interface PrescriptionCardProps {
  prescription: Prescription;
}

function AnimatedSection({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 600 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  const accentColor = STYLE_COLORS[prescription.style];
  const date = new Date(prescription.createdAt);
  const dateStr = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <Animated.View entering={FadeInUp.duration(800)} className="mx-6">
      <View
        className="rounded-[40px] overflow-hidden bg-white"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.08,
          shadowRadius: 30,
          elevation: 10,
          borderWidth: 1,
          borderColor: '#F0F9FF',
        }}
      >
        {/* 헤더 */}
        <AnimatedSection delay={0}>
          <View
            className="px-8 pt-10 pb-6"
            style={{ backgroundColor: accentColor + '08' }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <View 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: accentColor }} 
                />
                <Text
                  className="text-xs font-bold tracking-widest opacity-60"
                  style={{ color: accentColor }}
                >
                  {STYLE_LABELS[prescription.style].toUpperCase()}
                </Text>
              </View>
              <View className="flex-row items-center opacity-30">
                <CalendarDays size={12} color="#164E63" className="mr-1" />
                <Text className="text-[10px] text-cyan950 font-bold">{dateStr}</Text>
              </View>
            </View>
            <Text
              className="text-3xl font-bold text-cyan950 leading-10"
              style={{ fontFamily: Platform.OS === 'ios' ? 'NanumMyeongjoBold' : 'System' }}
            >
              {prescription.title}
            </Text>
          </View>
        </AnimatedSection>

        {/* 처방 내용 구분선 */}
        <AnimatedSection delay={200}>
          <View
            className="mx-8 my-0 h-px"
            style={{ backgroundColor: accentColor + '15' }}
          />
        </AnimatedSection>

        {/* 본문 내용 */}
        <AnimatedSection delay={350}>
          <View className="px-8 py-8 min-h-[200px]">
            <View className="flex-row items-center mb-4 opacity-20">
              <ScrollText size={16} color="#164E63" className="mr-2" />
              <Text className="text-[10px] font-bold tracking-tighter text-cyan950">PRESCRIPTION CONTENT</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                className="text-cyan950 text-lg leading-8 opacity-80"
                style={{ fontFamily: Platform.OS === 'ios' ? 'Pretendard' : 'System' }}
              >
                {prescription.content}
              </Text>
            </ScrollView>
          </View>
        </AnimatedSection>

        {/* 명언 */}
        <AnimatedSection delay={550}>
          <View
            className="mx-8 mb-10 p-6 rounded-[32px]"
            style={{ backgroundColor: accentColor + '05', borderStyle: 'dashed', borderWidth: 1, borderColor: accentColor + '20' }}
          >
            <Quote size={20} color={accentColor} className="mb-3 opacity-40" />
            <Text
              className="text-cyan950 text-base leading-7 font-medium italic opacity-70"
              style={{ fontFamily: Platform.OS === 'ios' ? 'NanumMyeongjo' : 'System' }}
            >
              "{prescription.quote}"
            </Text>
          </View>
        </AnimatedSection>
      </View>
    </Animated.View>
  );
}
