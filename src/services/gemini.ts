import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ParsedIntent {
  intent: string;
  summary: string;
  priority: "Low" | "Medium" | "High";
  suggestedAction: string;
}

export async function parseUserIntent(input: string): Promise<ParsedIntent> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: input,
    config: {
      systemInstruction: `You are an AI system designed for real-world business workflows.
Your job is to process messy, unstructured, emotional, or incomplete user messages and convert them into clear, structured, and actionable outputs.

For every input, return ONLY the following fields in JSON format:
{
  "intent": "one or more clear categories",
  "summary": "1-2 line clean explanation",
  "priority": "Low / Medium / High",
  "suggestedAction": "specific next step"
}

Guidelines:
- Be concise and practical (no fluff)
- Handle multiple intents if present
- Infer missing context intelligently
- Prioritize real-world usefulness over literal interpretation
- Do NOT repeat the original message
- Do NOT add explanations outside the format`,
      responseMimeType: "application/json",
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    throw new Error("Invalid AI response format");
  }
}
