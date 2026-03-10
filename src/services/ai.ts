import { GoogleGenerativeAI } from '@google/generative-ai';
import { Prescription, PrescriptionStyle } from '../types/prescription';
import { STYLE_PROMPTS, buildUserPrompt } from './prompts';

const TIMEOUT_MS = 10000;

const FALLBACK_PRESCRIPTION: Omit<Prescription, 'id' | 'createdAt' | 'style'> = {
  title: '잠시 쉬어가는 시간',
  content:
    '지금 이 순간, 잠시 멈추고 깊게 숨을 들이쉬어 보세요. 모든 것을 해결하려 하지 않아도 됩니다. 오늘 하루 여기까지 온 것만으로도 충분합니다.',
  quote: '천 리 길도 한 걸음부터. — 노자',
};

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

function createFallback(style: PrescriptionStyle): Prescription {
  return {
    ...FALLBACK_PRESCRIPTION,
    id: `fallback-${Date.now()}`,
    style,
    createdAt: new Date().toISOString(),
  };
}

interface GeminiResponse {
  title: string;
  content: string;
  quote: string;
}

function isValidResponse(data: unknown): data is GeminiResponse {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.title === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.quote === 'string'
  );
}

export async function generatePrescription(
  worry: string,
  style: PrescriptionStyle
): Promise<Prescription> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return createFallback(style);
  }

  try {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
      systemInstruction: STYLE_PROMPTS[style],
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), TIMEOUT_MS)
    );

    const generatePromise = model.generateContent(buildUserPrompt(worry));
    const result = await Promise.race([generatePromise, timeoutPromise]);

    const text = result.response.text();
    const parsed: unknown = JSON.parse(text);

    if (!isValidResponse(parsed)) {
      return createFallback(style);
    }

    return {
      id: `prescription-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: parsed.title,
      content: parsed.content,
      quote: parsed.quote,
      style,
      createdAt: new Date().toISOString(),
    };
  } catch {
    return createFallback(style);
  }
}
