import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Paperclip, 
  Download, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Sparkles,
  Info
} from 'lucide-react';
import { SupportIssue, SupportTicket, ChatMessage } from '../types/support';

interface LiveChatModalProps {
  initialIssue?: SupportIssue | null;
  initialLogs?: string[];
  agentImage: string;
  onClose: () => void;
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  initialIssue,
  initialLogs,
  agentImage,
  onClose,
  onTicketCreated
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [queueState, setQueueState] = useState<'queue' | 'connected'>('queue');
  const [ticketNumber] = useState(`SRX-${Math.floor(10000000 + Math.random() * 90000000)}`);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial connection simulation
  useEffect(() => {
    const queueTimer = setTimeout(() => {
      setQueueState('connected');

      // Create new ticket
      const newTicket: SupportTicket = {
        ticketNumber,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        product: initialIssue?.productId ? `Windows (${initialIssue.productId})` : 'Windows Support',
        issueTitle: initialIssue?.title || 'Windows General Technical Inquiry',
        channel: 'chat',
        status: 'In Progress',
        notes: 'Chat session initiated with Support Ambassador Elena Martinez.'
      };
      onTicketCreated(newTicket);

      // Initial greetings
      setMessages([
        {
          id: '1',
          sender: 'system',
          senderName: 'System',
          text: `You are connected to Microsoft Support Ambassador Elena Martinez. Your Case ID is ${ticketNumber}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: '2',
          sender: 'agent',
          senderName: 'Elena Martinez',
          text: `Hello! Thanks for contacting Microsoft Windows Support. My name is Elena. I see you are inquiring regarding ${
            initialIssue ? initialIssue.title : 'Windows 11 / 10'
          }. How can I assist you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // If initial diagnostic logs were passed, auto-share them
      if (initialLogs && initialLogs.length > 0) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: '3',
              sender: 'user',
              senderName: 'You',
              text: 'Here is my recent Windows Diagnostic Log for reference:',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isDiagnostic: true,
              diagnosticData: {
                'Log Summary': initialLogs.slice(-2).join(' | '),
                'Status': 'Diagnostic Log Attached'
              }
            }
          ]);

          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
              ...prev,
              {
                id: '4',
                sender: 'agent',
                senderName: 'Elena Martinez',
                text: 'Thank you for sharing the diagnostic trace! I reviewed the log. Let me provide the exact sequence to clear this issue on your machine.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }, 1800);
        }, 1000);
      }
    }, 1200);

    return () => clearTimeout(queueTimer);
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      senderName: 'You',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent support ambassador response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = generateAgentReply(text);
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'agent',
          senderName: 'Elena Martinez',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const generateAgentReply = (userText: string): string => {
    const lower = userText.toLowerCase();

    if (lower.includes('activate') || lower.includes('key') || lower.includes('0x803fa067')) {
      return "For Windows activation error 0x803FA067 or licensing mismatches: If you recently upgraded your hardware, press Win + I > System > Activation > Troubleshoot. If you have a digital license tied to your account, selecting 'I changed hardware on this device recently' will transfer your entitlement immediately. Would you like me to check your license status directly?";
    }
    if (lower.includes('update') || lower.includes('0x80070002') || lower.includes('stuck')) {
      return "For Windows Update errors like 0x80070002: Please press Win + X and open Terminal as Administrator. Run: 'net stop wuauserv && del /f /s /q %windir%\\SoftwareDistribution\\Download && net start wuauserv'. This purges corrupted delta downloads and forces a clean sync with our CDN.";
    }
    if (lower.includes('audio') || lower.includes('sound') || lower.includes('mic')) {
      return "For audio cutouts and unrecognized devices: Let's restart the Windows Audio Service. Open elevated PowerShell and type: 'Restart-Service Audiosrv -Force'. Then check Device Manager under 'Sound, video and game controllers' to make sure the Realtek or Intel HD Audio driver is enabled.";
    }
    if (lower.includes('blue screen') || lower.includes('bsod') || lower.includes('crash')) {
      return "For Blue Screen stop codes: Could you let me know if you see a specific sys driver mentioned on the blue screen (for example, nvlddmkm.sys or ntoskrnl.exe)? In 85% of cases, running 'sfc /scannow' in an Administrator command prompt repairs the underlying corrupted kernel binaries.";
    }
    if (lower.includes('surface') || lower.includes('battery') || lower.includes('pen')) {
      return "For Surface devices: I strongly recommend running the official Surface Diagnostic Toolkit. It tests battery voltage, touchscreen digitizer response, and checks for pending Surface UEFI firmware updates. I can also help you look up hardware replacement options if needed.";
    }
    return `Thank you for those details. I have logged this under your active support ticket ${ticketNumber}. I am checking our Microsoft Knowledge Base and internal diagnostic tools to provide the exact recommended fix. Is this occurring on Windows 11 or Windows 10?`;
  };

  const handleDownloadTranscript = () => {
    const text = messages
      .map(m => `[${m.timestamp}] ${m.senderName}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([`MICROSOFT SUPPORT CHAT TRANSCRIPT\nCase ID: ${ticketNumber}\nDate: ${new Date().toLocaleString()}\n\n` + text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Microsoft_Support_Transcript_${ticketNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickInquiries = [
    'Windows 11 activation issue',
    'Audio not working',
    'Windows Update failing',
    'BSOD crash troubleshooting'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-300 w-full max-w-2xl h-[650px] max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={agentImage}
                alt="Support Ambassador Elena Martinez"
                className="w-10 h-10 rounded-full object-cover border border-neutral-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-neutral-900">
                  Elena Martinez
                </h3>
                <span className="text-[11px] text-neutral-500">· Microsoft Ambassador</span>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono flex items-center gap-2">
                <span>Case: {ticketNumber}</span>
                <span className="text-emerald-700 font-sans font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Microsoft Support
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDownloadTranscript}
              className="p-1.5 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-md transition-colors"
              title="Download Chat Transcript"
              aria-label="Download Chat Transcript"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-md transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Queue Notice if connecting */}
        {queueState === 'queue' && (
          <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center justify-between text-xs text-blue-800">
            <span>Connecting to next available ambassador...</span>
            <span className="font-semibold">Queue position: 1</span>
          </div>
        )}

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-neutral-50/40 text-xs sm:text-sm">
          
          <div className="text-center my-2">
            <span className="text-[11px] text-neutral-400 bg-white px-2.5 py-1 rounded-full border border-neutral-200">
              End-to-end encrypted session with Microsoft Support
            </span>
          </div>

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.sender === 'system' ? (
                <div className="w-full text-center my-1.5">
                  <div className="inline-block p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs max-w-md">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className="text-[10px] text-neutral-400 mb-0.5 px-1">
                    {msg.senderName} · {msg.timestamp}
                  </div>
                  <div
                    className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-white text-neutral-900 border border-neutral-200 shadow-2xs rounded-bl-xs'
                    }`}
                  >
                    {msg.text}

                    {msg.isDiagnostic && msg.diagnosticData && (
                      <div className="mt-2 p-2 bg-blue-700/80 rounded text-[11px] font-mono text-left space-y-1">
                        <div>[SYSTEM DIAGNOSTIC ATTACHMENT]</div>
                        <div>Status: {msg.diagnosticData.Status}</div>
                        <div>Trace: {msg.diagnosticData['Log Summary']}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs py-1 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[11px]">Elena is typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-neutral-200 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] text-neutral-400 shrink-0 font-medium">Quick prompts:</span>
          {quickInquiries.map((inq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(inq)}
              className="px-2.5 py-1 text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md whitespace-nowrap shrink-0 transition-colors"
            >
              {inq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-neutral-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message to Support Ambassador Elena..."
              className="flex-1 py-2.5 px-3.5 text-xs sm:text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 rounded-lg transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-400 px-1">
            <span>Microsoft Service Request: {ticketNumber}</span>
            <span>Ambassador status: Online</span>
          </div>
        </div>

      </div>
    </div>
  );
};
