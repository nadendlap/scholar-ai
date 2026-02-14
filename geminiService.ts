import { GoogleGenAI, Type } from "@google/genai";
import { LessonContent, Question, CourseLevel } from "./types";

const API_KEY = process.env.API_KEY || "";

export const generateLessonContent = async (concept: string, level: CourseLevel = 'Standard'): Promise<LessonContent> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a detailed lesson on "${concept}" for high school. Level: ${level}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          eli5: {
            type: Type.OBJECT,
            properties: {
              introduction: { type: Type.STRING },
              analogies: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, explanation: { type: Type.STRING }, icon: { type: Type.STRING } }, required: ["title", "explanation", "icon"] } },
              keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["introduction", "analogies", "keyPoints"]
          },
          examReady: {
            type: Type.OBJECT,
            properties: {
              definition: { type: Type.STRING },
              technicalTerms: { type: Type.ARRAY, items: { type: Type.STRING } },
              examTips: { type: Type.STRING },
              commonMistakes: { type: Type.STRING }
            },
            required: ["definition", "technicalTerms", "examTips", "commonMistakes"]
          },
          examples: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, steps: { type: Type.ARRAY, items: { type: Type.STRING } }, answer: { type: Type.STRING } }, required: ["title", "steps", "answer"] } }
        },
        required: ["eli5", "examReady", "examples"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateQuizQuestions = async (concept: string, level: CourseLevel = 'Standard', count: number = 3): Promise<Question[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate ${count} quiz questions for ${concept} at ${level} level.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.OBJECT, properties: { A: { type: Type.STRING }, B: { type: Type.STRING }, C: { type: Type.STRING }, D: { type: Type.STRING } }, required: ["A", "B", "C", "D"] },
            correctAnswer: { type: Type.STRING },
            explanationELI5: { type: Type.STRING },
            explanationExamReady: { type: Type.STRING },
            misconceptions: { type: Type.OBJECT, properties: { A: { type: Type.STRING }, B: { type: Type.STRING }, C: { type: Type.STRING }, D: { type: Type.STRING } }, required: ["A", "B", "C", "D"] },
            relatedMaterials: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, icon: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["title", "icon", "description"] } },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["id", "question", "options", "correctAnswer", "explanationELI5", "explanationExamReady", "misconceptions", "relatedMaterials"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateVisualAid = async (concept: string, explanation: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Diagram for ${concept}: ${explanation}` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch { return null; }
};

export const getTutorResponse = async (history: { role: string; content: string }[], message: string, concept: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: { systemInstruction: `You are Milo, an AI tutor for ${concept}. Use simple analogies and Socratic questioning.` },
  });
  const response = await chat.sendMessage({ message });
  return response.text || "Try again!";
};