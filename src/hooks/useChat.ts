"use client";

import { useState } from "react";
import { ChatMessage, AgentTask, Attachment, AgentMode, Source } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = async (content: string, attachments: Attachment[], mode: AgentMode) => {
    // 1. Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      attachments,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);
    
    // 2. Setup tasks based on mode
    let mockTasks: AgentTask[] = [];
    if (mode === 'search' || mode === 'research') {
      mockTasks = [
        { id: 't1', type: 'understanding', status: 'active', label: 'Understanding request' },
        { id: 't2', type: 'search', status: 'pending', label: 'Searching web sources' },
        { id: 't3', type: 'generate', status: 'pending', label: 'Generating answer' },
      ];
    } else if (attachments.length > 0) {
      mockTasks = [
        { id: 't1', type: 'vision', status: 'active', label: 'Analyzing files/images' },
        { id: 't2', type: 'generate', status: 'pending', label: 'Generating response' },
      ];
    } else {
      mockTasks = [
        { id: 't1', type: 'generate', status: 'active', label: 'Generating response' },
      ];
    }

    setTasks(mockTasks);

    try {
      // Process attachments into base64 if they are images or PDFs
      const processedAttachments = await Promise.all(attachments.map(async (att) => {
        if ((att.type === 'image' || att.type === 'pdf') && att.file) {
          try {
            const buffer = await att.file.arrayBuffer();
            const base64Data = Buffer.from(buffer).toString('base64');
            return {
              ...att,
              base64Data,
              mimeType: att.file.type,
              file: undefined // don't send raw file object in JSON
            };
          } catch (e) {
            console.error("Failed to process file blob", e);
            return { ...att, file: undefined };
          }
        }
        return { ...att, file: undefined };
      }));

      // Call real backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          attachments: processedAttachments,
          mode
        })
      });

      setTasks(prev => prev.map(t => ({ ...t, status: 'completed' })));

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        sources: data.sources,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error(error);
      setTasks(prev => prev.map(t => ({ ...t, status: 'error', label: error.message })));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}`,
        timestamp: Date.now()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    tasks,
    isProcessing,
    sendMessage
  };
}
