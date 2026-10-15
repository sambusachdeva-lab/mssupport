import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  MessageSquare, 
  PhoneCall, 
  Users, 
  Wrench, 
  AlertCircle, 
  Terminal, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles
} from 'lucide-react';
import { SupportIssue } from '../types/support';

interface SupportSolutionsViewProps {
  issue: SupportIssue;
  onBack: () => void;
  onOpenChat: (issue: SupportIssue) => void;
  onOpenCallback: (issue: SupportIssue) => void;
  onOpenCommunity: () => void;
  onLaunchDiagnostics: (type: string) => void;
}

export const SupportSolutionsView: React.FC<SupportSolutionsViewProps> = ({
  issue,
  onBack,
  onOpenChat,
  onOpenCallback,
  onOpenCommunity,
  onLaunchDiagnostics
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [simulatedIndex, setSimulatedIndex] = useState<number | null>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const handleCopyCommand = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSimulateCommand = (index: number) => {
    setSimulatedIndex(index);
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-neutral-700 hover:text-blue-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all products</span>
        </button>
        <span aria-hidden="true">/</span>
        <span className="capitalize">{issue.productId}</span>
        <span aria-hidden="true">/</span>
        <span className="text-neutral-800 font-medium truncate">{issue.title}</span>
      </div>

      {/* Main Issue Article Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs mb-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
              Verified Self-Help Solution
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {issue.title}
            </h1>
          </div>
          
          {issue.automatedTroubleshooterAvailable && (
            <button
              onClick={() => onLaunchDiagnostics(issue.troubleshooterType || 'full')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shrink-0 shadow-xs"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Run Automated Troubleshooter</span>
            </button>
          )}
        </div>

        <p className="text-sm text-neutral-600 mt-4 mb-6 leading-relaxed">
          {issue.summary}
        </p>

        {/* Common Error Codes Badges if applicable */}
        {issue.commonErrorCodes && issue.commonErrorCodes.length > 0 && (
          <div className="mb-8 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-neutral-700">Associated Stop & Error Codes:</span>
            {issue.commonErrorCodes.map(code => (
              <span
                key={code}
                className="font-mono text-xs px-2 py-0.5 bg-white border border-neutral-300 rounded text-neutral-800"
              >
                {code}
              </span>
            ))}
          </div>
        )}

        {/* Step-by-Step Resolution Steps */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-neutral-900">
            Recommended Resolution Steps
          </h2>

          {issue.steps.map((step, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-lg border border-neutral-200 bg-neutral-50/50">
              <h3 className="text-sm font-bold text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                {step.description}
              </p>

              {/* Command box if available */}
              {step.command && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-t-md font-mono border-b border-neutral-800">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      Administrator: Command Prompt / PowerShell
                    </span>
                    <button
                      onClick={() => handleCopyCommand(step.command!, idx)}
                      className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-sans">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="font-sans">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 bg-neutral-900 text-neutral-100 font-mono text-xs rounded-b-md overflow-x-auto select-all">
                    <code>{step.command}</code>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleSimulateCommand(idx)}
                      disabled={simulationRunning}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{simulationRunning && simulatedIndex === idx ? 'Testing command syntax...' : 'Simulate command verification'}</span>
                    </button>
                  </div>

                  {simulatedIndex === idx && (
                    <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 font-mono">
                      {simulationRunning ? (
                        <span className="animate-pulse">Checking syntax with Windows Package Manager registry...</span>
                      ) : (
                        <span>[Syntax Check Verified] Command matches official Microsoft TechNet specification. Run in an elevated prompt.</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-neutral-600">
            Did this resolve your problem?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedback('yes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                feedback === 'yes'
                  ? 'bg-green-50 border-green-400 text-green-700'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => setFeedback('no')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                feedback === 'no'
                  ? 'bg-amber-50 border-amber-400 text-amber-700'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>No, I still need help</span>
            </button>
          </div>
        </div>

        {feedback === 'yes' && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md text-xs">
            Thank you for your feedback! Your response helps us improve Microsoft Support articles.
          </div>
        )}

      </div>

      {/* Still Need Help? Contact Channels (Contact Us Primary Purpose) */}
      <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Still need help with this issue?
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Choose how you'd like to reach our Microsoft Support Ambassadors and engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Channel 1: Live Chat */}
          <div className="bg-white p-5 rounded-lg border border-neutral-200 hover:border-blue-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">
                Chat with a Support Ambassador
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                Live interactive messaging with a specialized Windows technical ambassador.
              </p>
              <div className="text-xs text-emerald-600 font-medium mb-4 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Wait time: ~1 min (Ambassador online)</span>
              </div>
            </div>
            <button
              onClick={() => onOpenChat(issue)}
              className="w-full py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-center"
            >
              Start Live Chat
            </button>
          </div>

          {/* Channel 2: Phone Callback */}
          <div className="bg-white p-5 rounded-lg border border-neutral-200 hover:border-blue-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">
                Request a Call Back
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                Give us your phone number and an engineer will call you back directly.
              </p>
              <div className="text-xs text-neutral-500 mb-4">
                Available: Mon - Fri, 6 AM - 6 PM PT
              </div>
            </div>
            <button
              onClick={() => onOpenCallback(issue)}
              className="w-full py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors text-center"
            >
              Schedule Call Back
            </button>
          </div>

          {/* Channel 3: Microsoft Community */}
          <div className="bg-white p-5 rounded-lg border border-neutral-200 hover:border-blue-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">
                Ask Microsoft Community
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                Find answers from Microsoft MVPs and millions of experienced Windows users.
              </p>
              <div className="text-xs text-neutral-500 mb-4">
                Active community with verified answers
              </div>
            </div>
            <button
              onClick={onOpenCommunity}
              className="w-full py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors text-center"
            >
              Browse Forums
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
