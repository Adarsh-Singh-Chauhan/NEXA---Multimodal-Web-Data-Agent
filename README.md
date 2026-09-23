<div align="center">
  <img src="https://img.icons8.com/?size=100&id=113824&format=png&color=ff5a1f" alt="NEXA Logo" width="80" />
  <h1 align="center">NEXA</h1>
  <p align="center">
    <strong>A Production-Ready Multimodal AI Web Data Agent</strong>
  </p>
  <p align="center">
    Built with Next.js, Tailwind CSS, and Google Gemini 1.5 Flash.
  </p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Gemini API](https://img.shields.io/badge/Google%20GenAI-SDK-orange?logo=google)](https://ai.google.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
</div>

<hr />

## ✨ Features

- 🧠 **Advanced Multimodal AI**: Send text, images, and PDFs in a single query. NEXA understands your visual and textual data simultaneously.
- 📁 **Real File Processing**: Features a native system file picker, instant local image previews, and automated Base64 encoding for document ingestion.
- 🔄 **Dynamic Agent Modes**: Easily toggle your AI agent between Chat, Search, Scrape, Map, Crawl, and Analyze modes (built for extensible architecture).
- 🎨 **Premium UI/UX**: Designed with a sleek white aesthetic, subtle grid backgrounds, glassmorphism UI cards, and smooth Framer Motion micro-interactions.
- 🔒 **Secure Architecture**: Server-side API abstraction built on the modern `@google/genai` SDK guarantees that your API keys are never exposed to the client.
- 🛡️ **Graceful Fallbacks**: Beautifully designed UI error handling for missing configuration or API keys, preventing jarring server crashes.

## 🚀 Getting Started

Follow these steps to get NEXA running locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adarsh-Singh-Chauhan/NEXA---Multimodal-Web-Data-Agent.git
   cd NEXA---Multimodal-Web-Data-Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Rename `.env.example` to `.env.local` (or create a new `.env.local` file) and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your favorite web browser.

## 🏗️ Tech Stack Architecture

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Vanilla Tailwind CSS with custom theme extensions
- **Icons & Animations:** Lucide React & Framer Motion
- **AI Backend:** `@google/genai`
- **Language:** TypeScript

## 💡 How to Use

1. Click the **`+`** icon in the chat input to open the attachment menu.
2. Select an Image (`.png`, `.jpg`) or a Document (`.pdf`).
3. Type your prompt (e.g., *"Extract the text from this image and summarize this PDF"*).
4. Hit **Send** and watch the Activity Panel track the agent's progress!

---
<div align="center">
  <p>Created by Adarsh Singh Chauhan</p>
</div>
