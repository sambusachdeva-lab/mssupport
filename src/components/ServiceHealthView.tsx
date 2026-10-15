import React, { useState } from 'react';
import { CheckCircle2, RefreshCw, ArrowLeft, Activity, ShieldCheck } from 'lucide-react';
import { SERVICE_STATUS_ITEMS } from '../data/supportData';

interface ServiceHealthViewProps {
  onBack: () => void;
}

export const ServiceHealthView: React.FC<ServiceHealthViewProps> = ({ onBack }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastChecked(new Date().toLocaleTimeString());
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Contact Support</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>All Systems Operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Microsoft & Windows Service Status
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Real-time operational health of Microsoft Activation, Windows Update servers, and cloud services.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Check Status</span>
          </button>
        </div>

        <div className="pt-6 space-y-3">
          {SERVICE_STATUS_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/50 flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-neutral-900">{item.name}</span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-neutral-500 font-mono hidden sm:inline">
                  Latency: {item.latency}
                </span>
                <span className="text-emerald-700 font-medium">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>Official Microsoft Azure & Windows Telemetry</span>
          <span>Last synchronized: {lastChecked}</span>
        </div>
      </div>

    </div>
  );
};
