"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage, AgentTask } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { ActivityPanel } from "./ActivityPanel";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  tasks: AgentTask[];
  isProcessing: boolean;
}

export function ChatInterface({ messages, tasks, isProcessing }: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, tasks]);

  return (
    <div className="flex-1 w-full flex flex-col overflow-y-auto pb-48 pt-20">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-1">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isProcessing && tasks.length > 0 && (
          <ActivityPanel tasks={tasks} />
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
