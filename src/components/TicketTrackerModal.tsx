import React, { useState } from 'react';
import { X, Ticket, Clock, CheckCircle2, PhoneCall, MessageSquare, Copy, Check, Trash2 } from 'lucide-react';
import { SupportTicket } from '../types/support';

interface TicketTrackerModalProps {
  tickets: SupportTicket[];
  onClose: () => void;
  onCancelTicket: (ticketNumber: string) => void;
  onOpenChatWithTicket: (ticket: SupportTicket) => void;
}

export const TicketTrackerModal: React.FC<TicketTrackerModalProps> = ({
  tickets,
  onClose,
  onCancelTicket,
  onOpenChatWithTicket
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-300 w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                My Microsoft Support Cases
              </h3>
              <p className="text-[11px] text-neutral-500">
                Active service requests & support transcripts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div
                key={ticket.ticketNumber}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-neutral-900">
                      {ticket.ticketNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(ticket.ticketNumber)}
                      className="text-neutral-400 hover:text-neutral-700"
                      title="Copy Case Number"
                    >
                      {copiedId === ticket.ticketNumber ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      ticket.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : ticket.status === 'Scheduled'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {ticket.issueTitle}
                  </h4>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    Product: {ticket.product} · Created: {ticket.createdAt}
                  </div>
                </div>

                {ticket.channel === 'callback' && ticket.contactPhone && (
                  <div className="text-xs text-neutral-600 bg-white p-2.5 rounded-md border border-neutral-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-indigo-700 font-medium">
                      <PhoneCall className="w-3.5 h-3.5" />
                      Callback: {ticket.contactPhone}
                    </span>
                    <span className="text-neutral-500 text-[11px]">{ticket.preferredTime}</span>
                  </div>
                )}

                {ticket.notes && (
                  <div className="text-xs text-neutral-600 bg-white p-2.5 rounded-md border border-neutral-200">
                    {ticket.notes}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-xs">
                  <button
                    onClick={() => onCancelTicket(ticket.ticketNumber)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Cancel Request</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenChatWithTicket(ticket);
                      onClose();
                    }}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Open Case Chat</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-neutral-500 text-xs sm:text-sm">
              <Ticket className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="font-semibold text-neutral-700">No active support requests</p>
              <p className="text-neutral-500 text-xs mt-1">
                When you initiate a live chat or schedule a callback, your case ID will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
