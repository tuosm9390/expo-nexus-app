import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { usePrescriptionStore } from '../../src/store/prescriptionStore';
import { PrescriptionListItem } from '../../src/components/Prescription/PrescriptionListItem';
import { PrescriptionCard } from '../../src/components/Prescription/PrescriptionCard';
import { Prescription } from '../../src/types/prescription';

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <Text className="text-6xl mb-4">🗄️</Text>
      <Text className="text-softCharcoal text-xl font-bold mb-2 text-center">
        약장이 비어있어요
      </Text>
      <Text className="text-gray-400 text-sm text-center leading-5">
        심야의 약방에서 처방을 받으면{'\n'}여기에 기록됩니다
      </Text>
    </View>
  );
}

export default function CabinetScreen() {
  const prescriptions = usePrescriptionStore((s) => s.prescriptions);
  const removePrescription = usePrescriptionStore((s) => s.removePrescription);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-warmWhite">
      {prescriptions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <View className="px-4 pt-4 pb-3">
            <Text className="text-gray-400 text-xs">
              총 {prescriptions.length}개의 처방전
            </Text>
          </View>
          <FlatList
            data={prescriptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PrescriptionListItem
                prescription={item}
                onPress={setSelectedPrescription}
                onDelete={removePrescription}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </>
      )}

      <Modal
        visible={selectedPrescription !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedPrescription(null)}
      >
        <View className="flex-1 bg-warmWhite">
          <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
            <Text className="text-softCharcoal text-lg font-bold">처방전 상세</Text>
            <TouchableOpacity
              onPress={() => setSelectedPrescription(null)}
              className="p-2"
            >
              <Text className="text-gray-400 text-lg">✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="pt-2">
            {selectedPrescription && (
              <PrescriptionCard prescription={selectedPrescription} />
            )}
            <View className="h-10" />
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
