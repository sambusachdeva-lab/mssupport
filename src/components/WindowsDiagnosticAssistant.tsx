import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Terminal, 
  Volume2, 
  KeyRound, 
  Cpu, 
  X, 
  Copy, 
  Check, 
  MessageSquare
} from 'lucide-react';
import { SupportIssue } from '../types/support';

interface WindowsDiagnosticAssistantProps {
  initialType?: string;
  onClose: () => void;
  onOpenChatWithLogs?: (logs: string[]) => void;
}

export const WindowsDiagnosticAssistant: React.FC<WindowsDiagnosticAssistantProps> = ({
  initialType = 'full',
  onClose,
  onOpenChatWithLogs
}) => {
  const [selectedTool, setSelectedTool] = useState(initialType);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [copiedLogs, setCopiedLogs] = useState(false);

  const diagnosticProfiles: Record<string, { title: string; steps: string[]; fixDescription: string }> = {
    update: {
      title: 'Windows Update Service Troubleshooter',
      steps: [
        'Checking Windows Update cryptographic service (cryptsvc)...',
        'Verifying Background Intelligent Transfer Service (BITS) status...',
        'Scanning SoftwareDistribution temporary package cache...',
        'Detecting orphaned manifest download transactions...',
        'Resetting Windows Update Catalog API handles...',
        'Starting Windows Update service (wuauserv) with clean cache...'
      ],
      fixDescription: 'Windows Update components have been purged and re-registered successfully. Error code 0x80070002 has been cleared.'
    },
    activation: {
      title: 'Windows License & Activation Validator',
      steps: [
        'Querying Software Licensing Service (slmgr.vbs)...',
        'Validating UEFI BIOS MSDM embedded product key...',
        'Pinging Microsoft Digital Licensing Activation Cloud...',
        'Synchronizing digital license entitlement token...',
        'Checking hardware hash ID against Microsoft Account...'
      ],
      fixDescription: 'Digital license verified. Machine hardware hash successfully registered with Microsoft Activation Servers.'
    },
    audio: {
      title: 'Windows Audio Endpoint & Driver Troubleshooter',
      steps: [
        'Probing default audio playback devices (Speakers / Headphones)...',
        'Checking Windows Audio Service (Audiosrv) status...',
        'Testing Windows Audio Endpoint Builder daemon...',
        'Checking exclusive mode locks and third-party enhancement drivers...',
        'Restarting Core Audio Graph API engine...'
      ],
      fixDescription: 'Audio endpoints synchronized. Windows Audio service has been restarted and audio buffer cleared.'
    },
    bsod: {
      title: 'System Crash & BSOD Dump Diagnostic',
      steps: [
        'Scanning %SystemRoot%\\Minidump directory for stop error dumps...',
        'Analyzing recent WHEA and kernel memory dump signatures...',
        'Verifying system file integrity (sfc /verifyonly simulation)...',
        'Checking pagefile.sys integrity on system partition (C:)...',
        'Auditing active graphics and storage driver versions...'
      ],
      fixDescription: 'Scan finished. Isolated potential page fault crash trace. Recommended action: Update OEM GPU driver and execute sfc /scannow in elevated prompt.'
    },
    full: {
      title: 'Full Windows 11 System Diagnostics',
      steps: [
        'Initializing Microsoft Get Help diagnostic engine...',
        'Checking Windows 11 version build integrity (24H2 / 23H2)...',
        'Checking disk health (S.M.A.R.T. telemetry query)...',
        'Testing network adapter DNS latency & Winsock stack...',
        'Inspecting background services and startup latency...',
        'Generating unified system diagnostic report...'
      ],
      fixDescription: 'Full system health diagnostic complete. System is stable. 1 temporary cache issue resolved.'
    }
  };

  const currentProfile = diagnosticProfiles[selectedTool] || diagnosticProfiles.full;

  const runDiagnostic = () => {
    setStatus('running');
    setProgress(0);
    setLogs([]);

    const profileSteps = currentProfile.steps;
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < profileSteps.length) {
        const currentStep = profileSteps[stepIndex];
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${currentStep}`]);
        stepIndex++;
        setProgress(Math.round((stepIndex / profileSteps.length) * 100));
      } else {
        clearInterval(interval);
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ✅ Diagnostics complete: ${currentProfile.fixDescription}`
        ]);
        setStatus('completed');
      }
    }, 600);
  };

  useEffect(() => {
    runDiagnostic();
  }, [selectedTool]);

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-300 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header styled like Windows 11 Get Help app */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                Windows Get Help Troubleshooter
              </h3>
              <p className="text-[11px] text-neutral-500">
                Official automated diagnostic engine
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

        {/* Diagnostic Selector Bar */}
        <div className="px-6 py-3 border-b border-neutral-200 bg-white flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold text-neutral-600 mr-1">Diagnostic Mode:</span>
          {[
            { id: 'full', label: 'General Health' },
            { id: 'update', label: 'Windows Update' },
            { id: 'activation', label: 'Activation' },
            { id: 'audio', label: 'Audio & Sound' },
            { id: 'bsod', label: 'Crash / BSOD' }
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => {
                if (status !== 'running') setSelectedTool(tool.id);
              }}
              disabled={status === 'running'}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedTool === tool.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              } disabled:opacity-50`}
            >
              {tool.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <h4 className="text-base font-bold text-neutral-900 mb-1">
              {currentProfile.title}
            </h4>
            <p className="text-xs text-neutral-500">
              Running automated diagnostic tests on your Windows operating system components.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
              <span>{status === 'running' ? 'Scanning & Repairing...' : 'Diagnostic Status'}</span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  status === 'completed' ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Terminal / Live Diagnostic Output */}
          <div className="bg-neutral-900 rounded-lg p-3.5 font-mono text-xs text-neutral-200 shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                Windows Diagnostic Execution Log
              </span>
              <button
                onClick={handleCopyLogs}
                className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
              >
                {copiedLogs ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLogs ? 'Copied' : 'Copy Log'}</span>
              </button>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log}
                </div>
              ))}
              {status === 'running' && (
                <div className="text-blue-400 animate-pulse flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Evaluating system state...</span>
                </div>
              )}
            </div>
          </div>

          {/* Result card upon completion */}
          {status === 'completed' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Diagnostic Completed</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                {currentProfile.fixDescription}
              </p>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={runDiagnostic}
            disabled={status === 'running'}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${status === 'running' ? 'animate-spin' : ''}`} />
            <span>Re-run Diagnostics</span>
          </button>

          <div className="flex items-center gap-2">
            {onOpenChatWithLogs && (
              <button
                onClick={() => {
                  onOpenChatWithLogs(logs);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Share Log with Ambassador</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
