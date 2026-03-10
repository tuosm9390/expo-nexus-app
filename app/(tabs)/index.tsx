import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { HeartPulse, Sparkles, Send } from 'lucide-react-native';
import { usePrescription } from '../../src/hooks/usePrescription';
import { StyleSelector } from '../../src/components/Prescription/StyleSelector';
import { WorryInput } from '../../src/components/Prescription/WorryInput';
import { BrewingAnimation } from '../../src/components/Prescription/BrewingAnimation';
import { PrescriptionCard } from '../../src/components/Prescription/PrescriptionCard';
import { PrescriptionStyle } from '../../src/types/prescription';

type ScreenState = 'idle' | 'input' | 'brewing' | 'result';

function FloatingIcon() {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2500 }),
        withTiming(15, { duration: 2500 })
      ),
      -1,
      true
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000 }),
        withTiming(0.9, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle} className="items-center py-12">
      <View 
        className="bg-white p-8 rounded-full"
        style={{
          shadowColor: '#0891B2',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 10,
          borderWidth: 1,
          borderColor: '#F0F9FF',
        }}
      >
        <HeartPulse size={80} color="#0891B2" strokeWidth={1.2} />
      </View>
    </Animated.View>
  );
}

export default function PharmacyScreen() {
  const [screenState, setScreenState] = useState<ScreenState>('idle');
  const [worry, setWorry] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<PrescriptionStyle>('F');
  const { generate, isGenerating, latestPrescription } = usePrescription();

  const handleStartInput = () => setScreenState('input');

  const handleSubmit = async () => {
    if (!worry.trim()) return;
    setScreenState('brewing');
    await generate(worry, selectedStyle);
    setScreenState('result');
  };

  const handleReset = () => {
    setWorry('');
    setSelectedStyle('F');
    setScreenState('idle');
  };

  if (screenState === 'brewing') {
    return (
      <SafeAreaView className="flex-1 bg-cyan50">
        <BrewingAnimation />
      </SafeAreaView>
    );
  }

  if (screenState === 'result' && latestPrescription) {
    return (
      <SafeAreaView className="flex-1 bg-cyan50">
        <ScrollView showsVerticalScrollIndicator={false} className="pt-4">
          <PrescriptionCard prescription={latestPrescription} />
          <View className="px-6 mt-8 mb-12">
            <TouchableOpacity
              onPress={handleReset}
              activeOpacity={0.7}
              className="bg-cyan600 py-5 rounded-3xl items-center"
              style={{
                shadowColor: '#0891B2',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Text className="text-white font-bold text-lg">
                새 처방 받기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screenState === 'input') {
    return (
      <SafeAreaView className="flex-1 bg-cyan50">
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-10 pb-4">
            <View className="flex-row items-center mb-2">
              <Sparkles size={20} color="#0891B2" style={{ marginRight: 8 }} />
              <Text className="text-cyan950 text-2xl font-bold">
                어떤 마음이신가요?
              </Text>
            </View>
            <Text className="text-cyan600 opacity-70 text-base font-medium">
              고민을 편하게 털어놓아 보세요.
            </Text>
          </View>

          <View className="mt-4">
            <WorryInput
              value={worry}
              onChangeText={setWorry}
              onSubmit={handleSubmit}
              isLoading={isGenerating}
            />
          </View>

          <View className="mt-4">
            <Text className="text-cyan950 text-base font-bold px-6 mb-4">
              조제 스타일을 골라주세요
            </Text>
            <StyleSelector
              selected={selectedStyle}
              onSelect={setSelectedStyle}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // idle state
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ECFEFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}>
        <FloatingIcon />
        
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{ 
              color: '#164E63', 
              fontSize: 36, 
              fontWeight: 'bold', 
              textAlign: 'center', 
              marginBottom: 16,
              lineHeight: 48 
            }}
          >
            심야의 약방
          </Text>
          <Text 
            style={{ 
              color: '#0891B2', 
              fontSize: 18, 
              textAlign: 'center', 
              lineHeight: 28, 
              marginBottom: 48,
              opacity: 0.8
            }}
          >
            당신의 지친 마음을 위한{"\n"}따뜻한 AI 처방전을 조제해드립니다
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleStartInput}
          activeOpacity={0.8}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 24,
            width: '100%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 8,
            borderWidth: 1,
            borderColor: '#FFFFFF',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#0891B2', fontWeight: 'bold', fontSize: 20, marginRight: 8 }}>처방 받기</Text>
            <Send size={20} color="#0891B2" />
          </View>
        </TouchableOpacity>

        <Text style={{ color: '#0891B2', opacity: 0.4, fontSize: 12, marginTop: 40 }}>
          Powered by Gemini AI • Antigravity
        </Text>
      </View>
    </SafeAreaView>
  );
}
