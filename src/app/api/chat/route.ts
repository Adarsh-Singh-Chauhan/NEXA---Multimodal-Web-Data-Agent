import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/services/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, attachments, mode } = body;

    // Use the GeminiService to generate the response
    // The service internally handles checking for the API key and multimodal processing
    const result = await geminiService.generateResponse(messages, attachments || [], mode || 'chat');

    return NextResponse.json({
      role: 'assistant',
      content: result.content,
      sources: result.sources,
      attachmentsProcessed: attachments ? attachments.length : 0,
      timestamp: Date.now()
    });

  } catch (error: any) {
    // We catch the error thrown by GeminiService (e.g., missing API key or generation error)
    // and return it as a clean configuration error rather than a 500 crash stack trace
    console.error("Chat API Route Error:", error.message);
    
    return NextResponse.json({ 
      error: error.message || "An error occurred during AI processing." 
    }, { status: 400 });
  }
}
