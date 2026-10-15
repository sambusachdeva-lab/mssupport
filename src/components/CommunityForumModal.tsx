import React, { useState } from 'react';
import { Users, Search, CheckCircle2, MessageSquare, Plus, ArrowLeft, Send } from 'lucide-react';
import { COMMUNITY_THREADS } from '../data/supportData';
import { CommunityThread } from '../types/support';

interface CommunityForumModalProps {
  onBack: () => void;
  onOpenChat: () => void;
}

export const CommunityForumModal: React.FC<CommunityForumModalProps> = ({
  onBack,
  onOpenChat
}) => {
  const [threads, setThreads] = useState<CommunityThread[]>(COMMUNITY_THREADS);
  const [selectedThread, setSelectedThread] = useState<CommunityThread | null>(null);
  const [search, setSearch] = useState('');
  const [showAskForm, setShowAskForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const filteredThreads = threads.filter(
    t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.snippet.toLowerCase().includes(search.toLowerCase())
  );

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newPost: CommunityThread = {
      id: `comm-${Date.now()}`,
      title: newTitle.trim(),
      author: 'Alex Reed',
      authorBadge: 'Member',
      date: 'Just now',
      views: 1,
      repliesCount: 1,
      hasVerifiedAnswer: true,
      snippet: newBody.trim().slice(0, 140) + '...',
      solution: 'Automated Community Dispatch: This question has been routed to Microsoft Community MVPs for review. Standard resolution time is ~15 minutes.'
    };

    setThreads([newPost, ...threads]);
    setSelectedThread(newPost);
    setShowAskForm(false);
    setNewTitle('');
    setNewBody('');
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Contact Support</span>
        </button>

        <button
          onClick={onOpenChat}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Need immediate help? Talk to an ambassador</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Microsoft Community Forums</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Windows Answers & Discussions
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                Get answers and troubleshooting guidance verified by Microsoft Most Valuable Professionals (MVPs) and Community Volunteer Moderators.
              </p>
            </div>

            <button
              onClick={() => {
                setShowAskForm(true);
                setSelectedThread(null);
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-md transition-colors shrink-0 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ask a Question</span>
            </button>
          </div>
        </div>

        {submittedFeedback && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border-b border-emerald-200 text-xs text-center font-medium">
            Your question has been posted to the Microsoft Community! An MVP will reply shortly.
          </div>
        )}

        {/* Ask Question Form Modal View */}
        {showAskForm ? (
          <div className="p-6 max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                Post to Microsoft Community
              </h3>
              <button
                onClick={() => setShowAskForm(false)}
                className="text-xs text-neutral-500 hover:text-neutral-800"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handlePostQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Windows 11 24H2 BSOD after graphics driver update"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-md focus:outline-none focus:border-blue-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Details & Error Codes
                </label>
                <textarea
                  value={newBody}
                  onChange={e => setNewBody(e.target.value)}
                  rows={4}
                  placeholder="Describe your Windows version, device model, what troubleshooting you have tried, and exact error text..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-md focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskForm(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Community</span>
                </button>
              </div>
            </form>
          </div>
        ) : selectedThread ? (
          /* Single Thread View */
          <div className="p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedThread(null)}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all threads</span>
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span className="font-semibold text-neutral-800">{selectedThread.author}</span>
                <span className="px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded text-[10px] font-medium border border-blue-200">
                  {selectedThread.authorBadge}
                </span>
                <span>·</span>
                <span>{selectedThread.date}</span>
                <span>·</span>
                <span>{selectedThread.views} views</span>
              </div>
              <h2 className="text-xl font-bold text-neutral-900">
                {selectedThread.title}
              </h2>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {selectedThread.snippet}
            </div>

            {/* Verified Answer Callout */}
            {selectedThread.solution && (
              <div className="p-5 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Answer by Microsoft MVP & Volunteer Moderator</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-sans">
                  {selectedThread.solution}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Threads List */
          <div className="p-6">
            <div className="mb-4 relative">
              <div className="absolute left-3.5 top-3 text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search community questions or error topics..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div className="divide-y divide-neutral-100">
              {filteredThreads.map(thread => (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className="py-4 hover:bg-neutral-50/80 px-3 -mx-3 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                    <span className="font-medium text-neutral-800">{thread.author}</span>
                    <span className="px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded text-[10px] font-medium border border-blue-200">
                      {thread.authorBadge}
                    </span>
                    <span>·</span>
                    <span>{thread.date}</span>
                    {thread.hasVerifiedAnswer && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-0.5 ml-auto">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Solution
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {thread.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-1 mt-1">
                    {thread.snippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
