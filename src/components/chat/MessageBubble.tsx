"use client";

import React from "react";
import { ChatMessage, Source } from "@/types";
import { Flame, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex w-full py-6 px-4 gap-4",
      isUser ? "bg-transparent" : "bg-gray-50/50 border-y border-gray-100"
    )}>
      <div className="flex-shrink-0 pt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-sm">
            <Flame className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* User Attachments Preview */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {message.attachments.map(att => (
              <div key={att.id} className="relative group rounded-xl overflow-hidden border border-gray-200">
                {att.type === 'image' && att.previewUrl ? (
                  <img src={att.previewUrl} alt={att.name} className="h-32 w-auto object-contain bg-gray-50" />
                ) : (
                  <div className="h-16 px-4 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-500">
                    {att.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Message Content (Mock Markdown) */}
        <div className="text-brand-dark leading-relaxed whitespace-pre-wrap font-sans text-[15px]">
          {message.content}
        </div>

        {/* Sources / Citations */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sources</h4>
            <div className="flex flex-wrap gap-3">
              {message.sources.map((src, i) => (
                <a 
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 pr-3 bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm transition-all"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                    {i + 1}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-brand-dark truncate max-w-[150px]">{src.title}</span>
                    <span className="text-xs text-gray-500 truncate">{src.domain}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
