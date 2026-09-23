# NEXA - Multimodal Web Data Agent

NEXA is a modern, production-ready AI web data agent built with Next.js, Tailwind CSS, and Google's Gemini AI. It allows users to search documents, evaluate images, and seamlessly interact with multimodal data through a premium, SaaS-like chat interface.

## Features

- **Multimodal AI Chat:** Send text, images, and PDFs in a single message using Google Gemini 1.5 Flash.
- **Real File Processing:** Native system file picker with instant local image previews and base64 document ingestion.
- **Dynamic Agent Modes:** Toggle between Search, Scrape, Map, Crawl, and Analyze modes (extensible architecture).
- **Modern UI/UX:** Clean white aesthetic, subtle grid backgrounds, glassmorphism effects, and Framer Motion micro-interactions.
- **Secure Architecture:** Server-side API abstraction for the Google GenAI SDK, ensuring API keys are never exposed to the client.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS & Lucide Icons
- **AI Backend:** `@google/genai` (Gemini API)
- **Language:** TypeScript
