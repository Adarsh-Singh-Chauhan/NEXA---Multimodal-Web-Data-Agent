import { GoogleGenAI } from '@google/genai';

// We do NOT instantiate the client globally if the key is missing to avoid immediate crashes
// The client will be instantiated conditionally when a method is called

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.checkConfiguration();
  }

  private checkConfiguration() {
    const key = process.env.GEMINI_API_KEY;
    if (key && key.trim().length > 0) {
      this.isConfigured = true;
      this.ai = new GoogleGenAI({ apiKey: key });
    } else {
      this.isConfigured = false;
      this.ai = null;
    }
    // We only log a boolean indicator, NEVER the actual key
    console.log(`[GeminiService] Gemini configured: ${this.isConfigured}`);
  }

  public async generateResponse(
    messages: any[], 
    attachments: any[], 
    mode: string
  ): Promise<{ content: string; sources: any[] }> {
    
    if (!this.isConfigured || !this.ai) {
      throw new Error("Gemini API is not configured. Add GEMINI_API_KEY to .env.local and restart the server.");
    }

    try {
      const lastMessage = messages[messages.length - 1].content;
      
      let systemInstruction = "You are NexaAI, an advanced AI agent that can search, analyze, and process multimodal data.";
      if (mode === 'search' || mode === 'research') {
        systemInstruction += " You have been asked to perform web research. Synthesize the best possible answer from your training data, and append mock references if requested.";
      }

      // @google/genai uses the contents array
      const contents: any[] = [];
      
      const parts: any[] = [
        { text: `System Instruction: ${systemInstruction}\n\nUser Request: ${lastMessage}` }
      ];

      // Handle multimodal attachments
      if (attachments && attachments.length > 0) {
        for (const att of attachments) {
          if (att.base64Data && (att.type === 'image' || att.type === 'pdf')) {
            parts.push({
              inlineData: {
                data: att.base64Data,
                mimeType: att.mimeType || (att.type === 'pdf' ? "application/pdf" : "image/jpeg"),
              }
            });
          } else if (att.textContent) {
            parts.push({ text: `\n\n--- Content from file: ${att.name} ---\n${att.textContent}\n--- End of file content ---\n` });
          }
        }
      }

      contents.push({ role: 'user', parts });

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash', // Modern model standard
        contents: contents,
      });

      // Mock sources if mode was search
      const sources = (mode === 'search' || mode === 'research') ? [
        { id: 's1', title: 'Generative AI Overview', url: 'https://ai.google.dev/', domain: 'ai.google.dev' },
        { id: 's2', title: 'Web Search Data', url: 'https://example.com', domain: 'example.com' }
      ] : [];

      return {
        content: response.text || "No response generated.",
        sources
      };
    } catch (error: any) {
      console.error("[GeminiService] Error generating response:", error);
      throw new Error(error.message || "An unexpected error occurred while communicating with Gemini API.");
    }
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
