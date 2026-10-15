/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { ProductCategoryGrid } from './components/ProductCategoryGrid';
import { SupportSolutionsView } from './components/SupportSolutionsView';
import { WindowsDiagnosticAssistant } from './components/WindowsDiagnosticAssistant';
import { LiveChatModal } from './components/LiveChatModal';
import { CallbackModal } from './components/CallbackModal';
import { ErrorCodeLookup } from './components/ErrorCodeLookup';
import { CommunityForumModal } from './components/CommunityForumModal';
import { TicketTrackerModal } from './components/TicketTrackerModal';
import { ServiceHealthView } from './components/ServiceHealthView';
import { Footer } from './components/Footer';
import { SUPPORT_ISSUES, SUPPORT_PRODUCTS } from './data/supportData';
import { Product, SupportIssue, SupportTicket } from './types/support';

// Asset paths generated via high-fidelity pipeline
const HERO_IMAGE = '/src/assets/images/windows_support_hero_1792024651455.jpg';
const AMBASSADOR_IMAGE = '/src/assets/images/support_ambassador_agent_1792024652185.jpg';
const HARDWARE_IMAGE = '/src/assets/images/surface_hardware_lab_1792024652221.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'diagnostics' | 'error-codes' | 'community' | 'status'>('home');
  const [selectedIssue, setSelectedIssue] = useState<SupportIssue | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Tools
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [diagnosticType, setDiagnosticType] = useState('full');
  const [diagnosticLogsToShare, setDiagnosticLogsToShare] = useState<string[]>([]);
  const [isTicketTrackerOpen, setIsTicketTrackerOpen] = useState(false);

  // User Tickets (seeded with one verified case)
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('msft_support_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        ticketNumber: 'SRX-71049281',
        createdAt: 'Oct 12, 2026',
        product: 'Windows 11 (24H2)',
        issueTitle: 'Windows Cumulative Security Update Rollback',
        channel: 'callback',
        status: 'Resolved',
        contactPhone: '+1 555-019-2834',
        preferredTime: 'Completed Oct 12',
        notes: 'Ambassador verified DISM component restore command. Case resolved.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('msft_support_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleTicketCreated = (ticket: SupportTicket) => {
    setTickets(prev => [ticket, ...prev.filter(t => t.ticketNumber !== ticket.ticketNumber)]);
  };

  const handleCancelTicket = (ticketNumber: string) => {
    setTickets(prev => prev.filter(t => t.ticketNumber !== ticketNumber));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    const relatedIssue = SUPPORT_ISSUES.find(i => i.productId === product.id);
    if (relatedIssue) {
      setSelectedIssue(relatedIssue);
    }
  };

  const handleSelectIssue = (issue: SupportIssue) => {
    setSelectedIssue(issue);
    setActiveTab('home');
  };

  const handleLaunchDiagnostics = (type: string) => {
    setDiagnosticType(type);
    setIsDiagnosticsOpen(true);
  };

  const handleStartChat = (issue?: SupportIssue | null) => {
    if (issue) setSelectedIssue(issue);
    setIsChatOpen(true);
  };

  const handleStartCallback = (issue?: SupportIssue | null) => {
    if (issue) setSelectedIssue(issue);
    setIsCallbackOpen(true);
  };

  const handleStartChatWithError = (code: string, name: string) => {
    const customIssue: SupportIssue = {
      id: `err-${code}`,
      productId: 'windows',
      title: `Error Code ${code}: ${name}`,
      category: 'update',
      summary: `Assistance requested regarding Windows stop error ${code}.`,
      steps: []
    };
    setSelectedIssue(customIssue);
    setIsChatOpen(true);
  };

  const handleOpenChatWithLogs = (logs: string[]) => {
    setDiagnosticLogsToShare(logs);
    setIsChatOpen(true);
  };

  const handleOpenChatWithTicket = (ticket: SupportTicket) => {
    const customIssue: SupportIssue = {
      id: ticket.ticketNumber,
      productId: 'windows',
      title: `${ticket.issueTitle} (${ticket.ticketNumber})`,
      category: 'update',
      summary: ticket.notes || 'Inquiry regarding existing case.',
      steps: []
    };
    setSelectedIssue(customIssue);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-neutral-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Microsoft Support Top Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab as any);
          if (tab !== 'home') setSelectedIssue(null);
        }}
        tickets={tickets}
        onOpenTickets={() => setIsTicketTrackerOpen(true)}
        onOpenSearch={() => {
          setActiveTab('home');
          setSelectedIssue(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {!selectedIssue ? (
              <>
                <HeroSearch
                  onSelectIssue={handleSelectIssue}
                  onSearchSubmit={q => {
                    const found = SUPPORT_ISSUES.find(i =>
                      i.title.toLowerCase().includes(q.toLowerCase()) ||
                      i.summary.toLowerCase().includes(q.toLowerCase())
                    );
                    if (found) {
                      handleSelectIssue(found);
                    } else {
                      handleLaunchDiagnostics('full');
                    }
                  }}
                />

                <ProductCategoryGrid
                  onSelectProduct={handleSelectProduct}
                  onSelectIssue={handleSelectIssue}
                  onLaunchDiagnostics={handleLaunchDiagnostics}
                  heroImage={HERO_IMAGE}
                />
              </>
            ) : (
              <SupportSolutionsView
                issue={selectedIssue}
                onBack={() => setSelectedIssue(null)}
                onOpenChat={handleStartChat}
                onOpenCallback={handleStartCallback}
                onOpenCommunity={() => setActiveTab('community')}
                onLaunchDiagnostics={handleLaunchDiagnostics}
              />
            )}
          </>
        )}

        {activeTab === 'diagnostics' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Windows Get Help Diagnostics Hub
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Run automated self-healing scripts to repair network stacks, clear Windows Update download caches, test audio endpoints, or inspect BSOD minidump logs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  id: 'update',
                  title: 'Windows Update Repair',
                  desc: 'Purges corrupted SoftwareDistribution download packages, resets cryptographic catalog signatures, and re-registers the wuauserv daemon.'
                },
                {
                  id: 'activation',
                  title: 'Activation & Licensing Validator',
                  desc: 'Queries Software Licensing Management (slmgr.vbs), re-arms licensing tokens, and validates hardware hash against Microsoft KMS cloud.'
                },
                {
                  id: 'audio',
                  title: 'Audio Graph & Endpoint Restart',
                  desc: 'Restarts Windows Audio Endpoint Builder, detects playback hardware disconnects, and restores default sample rates.'
                },
                {
                  id: 'bsod',
                  title: 'Crash & Minidump Diagnostic',
                  desc: 'Scans the Windows minidump storage directory for kernel driver faults, pagefile issues, and corrupted core binaries.'
                }
              ].map(item => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleLaunchDiagnostics(item.id)}
                    className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-center"
                  >
                    Start Diagnostic Test
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  Prefer direct human assistance?
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Our Microsoft Support Ambassadors are online right now to guide you step-by-step.
                </p>
              </div>
              <button
                onClick={() => handleStartChat(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors whitespace-nowrap"
              >
                Chat with Ambassador
              </button>
            </div>
          </div>
        )}

        {activeTab === 'error-codes' && (
          <ErrorCodeLookup
            onStartChatWithError={handleStartChatWithError}
            onLaunchDiagnostics={handleLaunchDiagnostics}
          />
        )}

        {activeTab === 'community' && (
          <CommunityForumModal
            onBack={() => setActiveTab('home')}
            onOpenChat={() => handleStartChat(null)}
          />
        )}

        {activeTab === 'status' && (
          <ServiceHealthView onBack={() => setActiveTab('home')} />
        )}
      </main>

      {/* Floating Ambassador Quick Action Strip */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => handleStartChat(selectedIssue)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full shadow-lg border border-neutral-700 transition-all hover:scale-102"
        >
          <div className="relative">
            <img
              src={AMBASSADOR_IMAGE}
              alt="Elena"
              className="w-6 h-6 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-neutral-900"></span>
          </div>
          <span className="text-xs font-semibold">Contact Ambassador</span>
        </button>
      </div>

      {/* Modals */}
      {isChatOpen && (
        <LiveChatModal
          initialIssue={selectedIssue}
          initialLogs={diagnosticLogsToShare}
          agentImage={AMBASSADOR_IMAGE}
          onClose={() => {
            setIsChatOpen(false);
            setDiagnosticLogsToShare([]);
          }}
          onTicketCreated={handleTicketCreated}
        />
      )}

      {isCallbackOpen && (
        <CallbackModal
          initialIssue={selectedIssue}
          onClose={() => setIsCallbackOpen(false)}
          onTicketCreated={handleTicketCreated}
        />
      )}

      {isDiagnosticsOpen && (
        <WindowsDiagnosticAssistant
          initialType={diagnosticType}
          onClose={() => setIsDiagnosticsOpen(false)}
          onOpenChatWithLogs={handleOpenChatWithLogs}
        />
      )}

      {isTicketTrackerOpen && (
        <TicketTrackerModal
          tickets={tickets}
          onClose={() => setIsTicketTrackerOpen(false)}
          onCancelTicket={handleCancelTicket}
          onOpenChatWithTicket={handleOpenChatWithTicket}
        />
      )}

      {/* Microsoft Corporate Footer */}
      <Footer />

    </div>
  );
}
