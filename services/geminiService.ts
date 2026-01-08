
import { GoogleGenAI } from "@google/genai";
import { SLOT_GAMES } from "../constants";

// Use process.env.API_KEY directly as per @google/genai guidelines.
// Assume this variable is pre-configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGameRecommendation = async (userInput: string) => {
  const gamesList = SLOT_GAMES.map(g => `${g.name} (Provider: ${g.provider})`).join(", ");
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User asks: "${userInput}". Based on the following free slot games we have: [${gamesList}], recommend 1-2 games and briefly explain why they match the user's vibe. Be friendly and enthusiastic. Keep it short.`,
      config: {
        systemInstruction: "You are a Slot Game Expert assistant. You help users find free slot games from our provided list. Do not discuss real money gambling. Focus on themes, features, and volatility."
      }
    });
    // The GenerateContentResponse features a text property (not a method)
    return response.text || "I couldn't find a specific recommendation, but Gates of Olympus is always a classic!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble thinking right now. Try checking out our top games!";
  }
};
