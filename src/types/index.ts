export type AttachmentType = 'image' | 'pdf' | 'document' | 'csv' | 'json' | 'other';

export interface Attachment {
  id: string;
  name: string;
  type: AttachmentType;
  size: number;
  url?: string;
  previewUrl?: string;
  file?: File;
  status: 'uploading' | 'ready' | 'error';
}

export interface Source {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  attachments?: Attachment[];
  sources?: Source[];
  timestamp: number;
}

export type AgentMode = 'chat' | 'search' | 'scrape' | 'map' | 'crawl' | 'analyze' | 'research';

export interface AgentTask {
  id: string;
  type: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  label: string;
}
