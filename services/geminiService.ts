
import { GoogleGenAI, Modality } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "ForeNova Expert", a senior forensic scientist with 30 years of experience in crime scene investigation, laboratory analysis, and expert testimony.
Your goal is to assist students and professionals with forensic science queries ONLY.

RULES:
1. Only answer questions related to forensic science, criminology, criminal law (relevant to forensics), and investigation techniques.
2. If a question is NOT related to forensics (e.g., recipes, generic advice, coding, entertainment), politely decline and state: "I am a forensic expert assistant and can only provide information regarding forensic science and criminology."
3. Provide detailed, accurate, and professional answers.
4. Use terminology like 'Chain of Custody', 'Locard's Principle', 'Luminol', 'Chromatography' where appropriate.
`;

export const getExpertResponse = async (userPrompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my database. Please try again later.";
  }
};

// Audio Utilities
export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
