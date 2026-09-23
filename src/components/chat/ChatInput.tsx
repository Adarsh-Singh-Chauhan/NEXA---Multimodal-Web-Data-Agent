"use client";

import React, { useState, useRef } from "react";
import { Plus, ArrowRight, Image as ImageIcon, FileText, FileSpreadsheet, Paperclip, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentMode, Attachment } from "@/types";

interface ChatInputProps {
  onSend: (message: string, attachments: Attachment[], mode: AgentMode) => void;
  isProcessing?: boolean;
}

const MODES: { id: AgentMode; label: string; icon?: React.ReactNode }[] = [
  { id: 'search', label: 'Search' },
  { id: 'scrape', label: 'Scrape' },
  { id: 'map', label: 'Map' },
  { id: 'crawl', label: 'Crawl' },
];

export function ChatInput({ onSend, isProcessing }: ChatInputProps) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<AgentMode>('search');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim() && attachments.length === 0) return;
    onSend(text, attachments, mode);
    setText("");
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    
    Array.from(files).forEach(file => {
      const isImage = file.type.startsWith('image/');
      const newAttachment: Attachment = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: isImage ? 'image' : (file.name.endsWith('.pdf') ? 'pdf' : 'document'),
        size: file.size,
        status: 'ready',
        file: file,
      };

      if (isImage) {
        // Create local object URL for preview
        newAttachment.previewUrl = URL.createObjectURL(file);
      }
      
      newAttachments.push(newAttachment);
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    setIsMenuOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const target = prev.find(a => a.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(a => a.id !== id);
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 relative z-20">
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden" 
        accept="image/*,.pdf,.doc,.docx,.txt,.csv,.json"
      />
      <div className="bg-white rounded-2xl shadow-xl shadow-brand-dark/5 border border-brand-border p-2">

        
        {/* Attachment Previews */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2 mb-2 border-b border-gray-100">
            {attachments.map(att => (
              <div key={att.id} className="flex items-center gap-2 bg-brand-gray px-3 py-1.5 rounded-lg text-sm border border-gray-200">
                {att.type === 'image' && att.previewUrl ? (
                  <img src={att.previewUrl} alt={att.name} className="w-6 h-6 rounded object-cover" />
                ) : (
                  <FileText className="w-4 h-4 text-gray-500" />
                )}
                <span className="font-medium text-brand-dark truncate max-w-[150px]">{att.name}</span>
                <button onClick={() => removeAttachment(att.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 p-1">
          {/* Attach Button Container */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
            
            {/* Attachment Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Attach</div>
                  <div className="flex flex-col pb-2">
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left text-sm text-brand-dark transition-colors">
                      <ImageIcon className="w-4 h-4 text-gray-400" /> Upload Image
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left text-sm text-brand-dark transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" /> Upload PDF
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left text-sm text-brand-dark transition-colors">
                      <FileSpreadsheet className="w-4 h-4 text-gray-400" /> Upload CSV/JSON
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your Question"
            className="flex-1 max-h-48 min-h-[44px] bg-transparent resize-none outline-none py-3 text-brand-dark placeholder-gray-400 text-base"
            rows={1}
          />

          <button 
            onClick={handleSend}
            disabled={isProcessing || (!text.trim() && attachments.length === 0)}
            className="p-3 bg-brand-orange hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl transition-all disabled:scale-100 hover:scale-105 active:scale-95"
          >
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Agent Modes Toolbar */}
        <div className="flex items-center px-4 py-2 gap-2 text-sm border-t border-gray-100 mt-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                mode === m.id 
                  ? 'bg-gray-100 text-brand-dark font-medium' 
                  : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
              }`}
            >
              <span className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                mode === m.id ? 'border-brand-orange bg-brand-orange/10' : 'border-gray-300'
              }`}>
                {mode === m.id && <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />}
              </span>
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
