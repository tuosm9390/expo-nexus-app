import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Sprout, Microscope, Flower } from 'lucide-react-native';
import { PrescriptionStyle } from '../../types/prescription';

interface StyleOption {
  key: PrescriptionStyle;
  icon: React.ElementType;
  label: string;
  sublabel: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  { key: 'F', icon: Sprout, label: '공감', sublabel: '따뜻한 위로' },
  { key: 'T', icon: Microscope, label: '이성', sublabel: '냉철한 해결' },
  { key: 'W', icon: Flower, label: '온기', sublabel: '시적인 격려' },
];

interface StyleCardProps {
  option: StyleOption;
  selected: boolean;
  onSelect: (key: PrescriptionStyle) => void;
}

function StyleCard({ option, selected, onSelect }: StyleCardProps) {
  const scale = useSharedValue(1);
  const Icon = option.icon;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.05, { damping: 10 });
    onSelect(option.key);
  };

  React.useEffect(() => {
    scale.value = withSpring(selected ? 1.05 : 1, { damping: 12 });
  }, [selected]);

  return (
    <Animated.View style={animatedStyle} className="flex-1 mx-1.5">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.9}
        className={`items-center justify-center p-5 rounded-3xl border ${
          selected
            ? 'bg-white border-cyan600'
            : 'bg-white border-white'
        }`}
        style={{
          shadowColor: selected ? '#0891B2' : '#000',
          shadowOffset: { width: 0, height: selected ? 6 : 4 },
          shadowOpacity: selected ? 0.15 : 0.04,
          shadowRadius: selected ? 12 : 8,
          elevation: selected ? 8 : 2,
        }}
      >
        <View className={`p-2 rounded-full mb-3 ${selected ? 'bg-cyan50' : 'bg-gray-50'}`}>
          <Icon size={32} color={selected ? '#0891B2' : '#94A3B8'} strokeWidth={1.5} />
        </View>
        <Text
          className={`text-base font-bold ${
            selected ? 'text-cyan950' : 'text-gray-500'
          }`}
        >
          {option.label}
        </Text>
        <Text
          className={`text-[10px] mt-1 font-medium ${
            selected ? 'text-cyan600 opacity-80' : 'text-gray-400'
          }`}
        >
          {option.sublabel}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

interface StyleSelectorProps {
  selected: PrescriptionStyle;
  onSelect: (style: PrescriptionStyle) => void;
}

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <View className="flex-row px-4.5 mb-8">
      {STYLE_OPTIONS.map((option) => (
        <StyleCard
          key={option.key}
          option={option}
          selected={selected === option.key}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}
