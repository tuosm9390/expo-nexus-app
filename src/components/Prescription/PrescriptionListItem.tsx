import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Prescription } from '../../types/prescription';

const STYLE_LABELS: Record<Prescription['style'], string> = {
  F: '공감',
  T: '이성',
  W: '온기',
};

const STYLE_COLORS: Record<Prescription['style'], string> = {
  F: '#B7C9B0',
  T: '#A1B5C1',
  W: '#D4B8C7',
};

const STYLE_EMOJIS: Record<Prescription['style'], string> = {
  F: '🌿',
  T: '🔬',
  W: '🌸',
};

interface PrescriptionListItemProps {
  prescription: Prescription;
  onPress: (prescription: Prescription) => void;
  onDelete: (id: string) => void;
}

export function PrescriptionListItem({
  prescription,
  onPress,
  onDelete,
}: PrescriptionListItemProps) {
  const accentColor = STYLE_COLORS[prescription.style];
  const date = new Date(prescription.createdAt);
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <TouchableOpacity
      onPress={() => onPress(prescription)}
      activeOpacity={0.75}
      className="mx-4 mb-3"
    >
      <View
        className="flex-row items-center bg-white rounded-2xl p-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
          borderWidth: 1,
          borderColor: '#F5F3F0',
        }}
      >
        {/* 스타일 배지 */}
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: accentColor + '30' }}
        >
          <Text className="text-xl">{STYLE_EMOJIS[prescription.style]}</Text>
        </View>

        {/* 내용 */}
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <View
              className="px-2 py-0.5 rounded-full mr-2"
              style={{ backgroundColor: accentColor + '30' }}
            >
              <Text className="text-xs font-semibold" style={{ color: accentColor }}>
                {STYLE_LABELS[prescription.style]}
              </Text>
            </View>
            <Text className="text-gray-400 text-xs">{dateStr}</Text>
          </View>
          <Text
            className="text-softCharcoal font-semibold text-sm"
            numberOfLines={1}
          >
            {prescription.title}
          </Text>
          <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>
            {prescription.content}
          </Text>
        </View>

        {/* 삭제 버튼 */}
        <TouchableOpacity
          onPress={() => onDelete(prescription.id)}
          className="ml-2 p-2"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-gray-300 text-lg">×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
