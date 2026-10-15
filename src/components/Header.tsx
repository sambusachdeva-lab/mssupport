import React from 'react';
import { Ticket, Search, User } from 'lucide-react';
import { SupportTicket } from '../types/support';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  tickets: SupportTicket[];
  onOpenTickets: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  tickets,
  onOpenTickets,
  onOpenSearch
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with Microsoft Quad Icon */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          {/* Microsoft Quad Logo */}
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0" aria-hidden="true">
            <span className="bg-[#f25022] rounded-[0.5px]"></span>
            <span className="bg-[#7fba00] rounded-[0.5px]"></span>
            <span className="bg-[#00a4ef] rounded-[0.5px]"></span>
            <span className="bg-[#ffb900] rounded-[0.5px]"></span>
          </div>
          <span className="text-base font-semibold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 group-hover:text-blue-700 transition-colors">
            Microsoft Support
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 pb-0.5 ${
              activeTab === 'home' ? 'text-neutral-900 border-b-2 border-blue-600 font-semibold' : ''
            }`}
          >
            Contact Support
          </button>
          <button
            onClick={() => onSelectTab('diagnostics')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 pb-0.5 ${
              activeTab === 'diagnostics' ? 'text-neutral-900 border-b-2 border-blue-600 font-semibold' : ''
            }`}
          >
            Get Help Assistant
          </button>
          <button
            onClick={() => onSelectTab('error-codes')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 pb-0.5 ${
              activeTab === 'error-codes' ? 'text-neutral-900 border-b-2 border-blue-600 font-semibold' : ''
            }`}
          >
            Error Code Directory
          </button>
          <button
            onClick={() => onSelectTab('community')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 pb-0.5 ${
              activeTab === 'community' ? 'text-neutral-900 border-b-2 border-blue-600 font-semibold' : ''
            }`}
          >
            Community Forums
          </button>
          <button
            onClick={() => onSelectTab('status')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 pb-0.5 ${
              activeTab === 'status' ? 'text-neutral-900 border-b-2 border-blue-600 font-semibold' : ''
            }`}
          >
            Service Health
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Support requests tracker with badge & profile) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
            title="Search Help Articles"
            aria-label="Search Help Articles"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTickets}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <Ticket className="w-3.5 h-3.5 text-blue-600" />
            <span>My Support Cases</span>
            {tickets.length > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {tickets.length}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-neutral-200 text-xs text-neutral-600">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="whitespace-nowrap">Alex R.</span>
          </div>
        </div>

      </div>
    </header>
  );
};
