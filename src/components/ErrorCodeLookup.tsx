import React, { useState } from 'react';
import { Search, Terminal, Copy, Check, MessageSquare, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { ERROR_CODES_DB } from '../data/supportData';
import { ErrorCodeInfo } from '../types/support';

interface ErrorCodeLookupProps {
  onStartChatWithError: (errorCode: string, name: string) => void;
  onLaunchDiagnostics: (type: string) => void;
}

export const ErrorCodeLookup: React.FC<ErrorCodeLookupProps> = ({
  onStartChatWithError,
  onLaunchDiagnostics
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCode, setExpandedCode] = useState<string | null>('0x803FA067');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const categories = ['All', 'Windows Activation', 'Windows Update', 'Blue Screen of Death (BSOD)', 'Windows Permissions & Store', 'Devices & Printing'];

  const filteredErrors = ERROR_CODES_DB.filter(item => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Windows Stop & Error Code Directory
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Look up specific hexadecimal and kernel stop codes to get official Microsoft root-cause analysis and automated repair scripts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 mb-6 space-y-3">
        <div className="relative">
          <div className="absolute left-3.5 top-3 text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search error code (e.g. 0x80070002, 0x803FA067, PAGE_FAULT, 0x0000011b)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 rounded-lg border border-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>

        {/* Category Pills (Functional buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="font-semibold text-neutral-500 mr-1">Filter by category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredErrors.length > 0 ? (
          filteredErrors.map(item => {
            const isExpanded = expandedCode === item.code;
            return (
              <div
                key={item.code}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-all shadow-2xs"
              >
                <div
                  onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50/50 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="font-mono font-bold text-sm text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                      {item.code}
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-neutral-900">
                        {item.name}
                      </h2>
                      <span className="text-xs text-neutral-500">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 hidden sm:inline">
                      {isExpanded ? 'Hide details' : 'View resolution'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-neutral-100 space-y-4 text-xs sm:text-sm">
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Technical Description
                      </h4>
                      <p className="text-neutral-600 leading-relaxed text-xs">
                        {item.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Common Root Causes
                      </h4>
                      <ul className="list-disc list-inside text-xs text-neutral-600 space-y-0.5">
                        {item.commonCauses.map((cause, idx) => (
                          <li key={idx}>{cause}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">
                        Official Recommended Resolution
                      </h4>
                      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-800 leading-relaxed">
                        {item.recommendedFix}
                      </div>
                    </div>

                    {item.powershellFix && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-blue-600" />
                            Direct Terminal / PowerShell Command
                          </span>
                          <button
                            onClick={() => handleCopy(item.powershellFix!, item.code)}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            {copiedKey === item.code ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === item.code ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="p-3 bg-neutral-900 text-neutral-100 font-mono text-xs rounded-md overflow-x-auto">
                          <code>{item.powershellFix}</code>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          if (item.category.includes('Update')) {
                            onLaunchDiagnostics('update');
                          } else if (item.category.includes('Activation')) {
                            onLaunchDiagnostics('activation');
                          } else if (item.category.includes('Blue Screen')) {
                            onLaunchDiagnostics('bsod');
                          } else {
                            onLaunchDiagnostics('full');
                          }
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                      >
                        <Wrench className="w-3.5 h-3.5 text-blue-600" />
                        <span>Run Automated Diagnostics for this error</span>
                      </button>

                      <button
                        onClick={() => onStartChatWithError(item.code, item.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Ambassador about {item.code}</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-neutral-200 text-neutral-500 text-xs sm:text-sm">
            No error codes found matching "{searchTerm}". You can still chat with an ambassador for live diagnostic lookup.
          </div>
        )}
      </div>

    </div>
  );
};
