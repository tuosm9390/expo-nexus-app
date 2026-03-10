import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { usePrescriptionStore } from '../src/store/prescriptionStore';
import { PrescriptionCard } from '../src/components/Prescription/PrescriptionCard';

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const prescriptions = usePrescriptionStore((s) => s.prescriptions);
  const prescription = prescriptions.find((p) => p.id === id);

  return (
    <View className="flex-1 bg-warmWhite">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pt-4">
          {prescription ? (
            <PrescriptionCard prescription={prescription} />
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-5xl mb-4">📋</Text>
              <Text className="text-softCharcoal text-base">
                처방전을 찾을 수 없습니다
              </Text>
            </View>
          )}
        </View>
        <View className="h-10" />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
