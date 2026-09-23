"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { messages, tasks, isProcessing, sendMessage } = useChat();
  const hasStarted = messages.length > 0;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      
      {/* Dynamic Content Area */}
      {hasStarted ? (
        <ChatInterface messages={messages} tasks={tasks} isProcessing={isProcessing} />
      ) : (
        <Hero />
      )}

      {/* Input Area (Pinned to bottom) */}
      <div className={`w-full fixed bottom-0 left-0 right-0 p-4 transition-all duration-500 ease-in-out bg-gradient-to-t from-white via-white to-transparent pb-8 ${
        hasStarted ? 'bg-white/80 backdrop-blur-md border-t border-gray-100' : ''
      }`}>
        <ChatInput onSend={sendMessage} isProcessing={isProcessing} />
      </div>
    </main>
  );
}
