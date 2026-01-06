
import { GoogleGenAI } from "@google/genai";

// Always initialize with process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are a helpful travel assistant for Cattleya Resort in Antipolo, Rizal. 
        Your goal is to answer questions about the resort, local attractions in Antipolo (like Pinto Art Museum, Antipolo Cathedral, Cloud 9), 
        and resort policies. Be warm, professional, and inviting. 
        Keep responses concise and helpful. 
        Note: The resort address is Sitio Ibabaw, Colaique, Bo. San Roque, Antipolo, Rizal. Phone: 0998 163 2946.`,
        temperature: 0.7,
      },
    });

    // Access .text property as a getter, not a method
    return response.text || "I'm sorry, I couldn't process that. Please try again or contact our front desk.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI assistant is currently taking a short break. Please contact us directly at 0998 163 2946!";
  }
};
