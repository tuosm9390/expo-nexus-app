import { useState } from 'react';
import { Prescription, PrescriptionStyle } from '../types/prescription';
import { generatePrescription } from '../services/ai';
import { usePrescriptionStore } from '../store/prescriptionStore';

interface UsePrescriptionReturn {
  generate: (worry: string, style: PrescriptionStyle) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
  latestPrescription: Prescription | null;
}

export function usePrescription(): UsePrescriptionReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestPrescription, setLatestPrescription] = useState<Prescription | null>(null);
  const addPrescription = usePrescriptionStore((s) => s.addPrescription);

  const generate = async (worry: string, style: PrescriptionStyle) => {
    if (!worry.trim()) {
      setError('고민을 입력해주세요.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const prescription = await generatePrescription(worry, style);
      setLatestPrescription(prescription);
      addPrescription(prescription);
    } catch {
      setError('처방전 조제에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate, isGenerating, error, latestPrescription };
}
