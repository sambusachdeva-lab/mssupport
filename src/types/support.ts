export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge?: string;
  popularIssues: string[];
}

export interface SupportIssue {
  id: string;
  productId: string;
  title: string;
  category: 'activation' | 'update' | 'bsod' | 'audio' | 'network' | 'performance' | 'recovery' | 'surface' | 'account';
  summary: string;
  commonErrorCodes?: string[];
  steps: {
    title: string;
    description: string;
    command?: string;
    warning?: string;
  }[];
  automatedTroubleshooterAvailable?: boolean;
  troubleshooterType?: string;
}

export interface ErrorCodeInfo {
  code: string;
  name: string;
  category: string;
  description: string;
  commonCauses: string[];
  recommendedFix: string;
  powershellFix?: string;
}

export interface CommunityThread {
  id: string;
  title: string;
  author: string;
  authorBadge: 'Microsoft MVP' | 'Community Moderator' | 'Windows Insider MVP' | 'Member';
  date: string;
  views: number;
  repliesCount: number;
  hasVerifiedAnswer: boolean;
  snippet: string;
  solution?: string;
}

export interface SupportTicket {
  ticketNumber: string;
  createdAt: string;
  product: string;
  issueTitle: string;
  channel: 'callback' | 'chat';
  status: 'In Queue' | 'Scheduled' | 'In Progress' | 'Resolved';
  contactPhone?: string;
  preferredTime?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  actionButtons?: { label: string; action: () => void }[];
  isDiagnostic?: boolean;
  diagnosticData?: Record<string, string>;
}
