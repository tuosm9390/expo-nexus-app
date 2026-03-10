import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Prescription } from '../types/prescription';
import { secureStorage } from './secureStorage';

const MAX_PRESCRIPTIONS = 50;

interface PrescriptionState {
  prescriptions: Prescription[];
  isLoading: boolean;
  addPrescription: (prescription: Prescription) => void;
  removePrescription: (id: string) => void;
  clearAll: () => void;
  setLoading: (loading: boolean) => void;
}

export const usePrescriptionStore = create<PrescriptionState>()(
  persist(
    (set) => ({
      prescriptions: [],
      isLoading: false,
      addPrescription: (prescription) =>
        set((state) => {
          const updated = [prescription, ...state.prescriptions];
          // 최대 50개 초과 시 오래된 항목 제거
          return { prescriptions: updated.slice(0, MAX_PRESCRIPTIONS) };
        }),
      removePrescription: (id) =>
        set((state) => ({
          prescriptions: state.prescriptions.filter((p) => p.id !== id),
        })),
      clearAll: () => set({ prescriptions: [] }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'sumpyo-prescription-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
