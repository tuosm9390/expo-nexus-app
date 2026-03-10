export interface Prescription {
  id: string;
  title: string;
  content: string;
  quote: string;
  style: 'F' | 'T' | 'W';
  createdAt: string; // ISO 8601
}

export type PrescriptionStyle = 'F' | 'T' | 'W';
