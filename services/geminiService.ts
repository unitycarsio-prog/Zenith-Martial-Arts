
import { GoogleGenAI, Type } from "@google/genai";
import type { CoursePlanDay, CoursePlanResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateCoursePlan(
  martialArt: string,
  duration: string
): Promise<CoursePlanDay[]> {
  const prompt = `
    Create a detailed, structured learning plan for a complete beginner to learn ${martialArt} over a period of ${duration}. 
    The plan should focus on fundamentals, basic stances, strikes, blocks, and simple forms or katas. 
    Break down the plan into logical segments (e.g., Day 1, Day 2, or Week 1, Week 2).
    For each segment, provide a clear title and a list of specific exercises, techniques, or concepts to learn and practice.
    The details should be concise and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plan: {
              type: Type.ARRAY,
              description: "The structured learning plan, broken down into days or weeks.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "The title for this segment of the plan (e.g., 'Day 1: Foundations' or 'Week 1: Stances and Basic Strikes')."
                  },
                  details: {
                    type: Type.ARRAY,
                    description: "A list of specific exercises, concepts, or techniques to learn in this segment.",
                    items: {
                      type: Type.STRING
                    }
                  }
                },
                 required: ["title", "details"]
              }
            }
          },
          required: ["plan"]
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the AI.");
    }

    const parsedResponse: CoursePlanResponse = JSON.parse(jsonText);
    if (!parsedResponse.plan || !Array.isArray(parsedResponse.plan)) {
        throw new Error("Invalid response format from the AI.");
    }

    return parsedResponse.plan;
  } catch (error) {
    console.error("Error generating course plan from Gemini:", error);
    throw new Error("Failed to communicate with the AI. Please check your connection or API key.");
  }
}
