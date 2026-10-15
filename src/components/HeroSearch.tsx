import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SUPPORT_ISSUES, ERROR_CODES_DB } from '../data/supportData';
import { SupportIssue } from '../types/support';

interface HeroSearchProps {
  onSelectIssue: (issue: SupportIssue) => void;
  onSearchSubmit: (query: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSelectIssue,
  onSearchSubmit
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter issues based on query
  const filteredIssues = query.trim()
    ? SUPPORT_ISSUES.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.summary.toLowerCase().includes(query.toLowerCase()) ||
          item.commonErrorCodes?.some(code => code.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const matchedErrors = query.trim()
    ? ERROR_CODES_DB.filter(
        err =>
          err.code.toLowerCase().includes(query.toLowerCase()) ||
          err.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularQueries = [
    'Windows 11 activation',
    'Windows update error 0x80070002',
    'Blue screen stop code',
    'Audio not working',
    'BitLocker recovery key'
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPopular = (q: string) => {
    setQuery(q);
    onSearchSubmit(q);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (filteredIssues.length > 0) {
        onSelectIssue(filteredIssues[0]);
      } else {
        onSearchSubmit(query.trim());
      }
      setIsOpen(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#f0f5fa] to-white border-b border-neutral-200 pt-10 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 mb-3">
          <span>Microsoft Support</span>
          <span aria-hidden="true">/</span>
          <span className="text-neutral-800 font-medium">Contact Us</span>
          For Instant Customer Support Instant Call On -: +1-855-773-6969
        </div>

        {/* Display headline */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3 text-balance">
          Contact Microsoft Support</br>
        For Instant Customer Support Instant Call On -: +1-855-773-6969
        </h1>
        <p className="text-base text-neutral-600 max-w-2xl mx-auto mb-8">
          Tell us about your issue so we can Support Instant Call On -: +1-855-773-6969 get you the right guided solutions, diagnostic tools, or connect you with a support ambassador.
        
        </p>

        {/* Search Input Box */}
        <div ref={dropdownRef} className="relative max-w-2xl mx-auto text-left">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <div className="absolute left-4 text-neutral-400 pointer-events-none">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Describe your issue (e.g. Windows activation, BSOD, audio, 0x80070002)..."
              className="w-full pl-12 pr-28 py-3.5 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 rounded-lg border border-neutral-300 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-20 text-neutral-400 hover:text-neutral-600 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className="absolute right-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors whitespace-nowrap shadow-xs"
            >
              Get Help
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {isOpen && (query.trim().length > 0) && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden z-30">
              {filteredIssues.length > 0 || matchedErrors.length > 0 ? (
                <div className="p-2 space-y-1">
                  {filteredIssues.slice(0, 4).map(issue => (
                    <button
                      key={issue.id}
                      onClick={() => {
                        onSelectIssue(issue);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-md hover:bg-neutral-50 flex items-start justify-between group transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium text-neutral-900 group-hover:text-blue-700">
                          {issue.title}
                        </div>
                        <div className="text-xs text-neutral-500 line-clamp-1">
                          {issue.summary}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 shrink-0 ml-2 mt-1" />
                    </button>
                  ))}

                  {matchedErrors.slice(0, 2).map(err => (
                    <div
                      key={err.code}
                      className="p-2.5 rounded-md bg-blue-50/60 border border-blue-100 text-xs"
                    >
                      <div className="font-semibold text-blue-900">
                        Error Code Match: {err.code} - {err.name}
                      </div>
                      <div className="text-neutral-600 mt-0.5">{err.recommendedFix}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-neutral-500">
                  No exact article match for "{query}". Press{' '}
                  <span className="font-semibold text-neutral-700">Get Help</span> to start automated troubleshooter.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular issue suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-neutral-500">
          <span className="font-medium text-neutral-600">Popular topics:</span>
          {popularQueries.map(item => (
            <button
              key={item}
              onClick={() => handleSelectPopular(item)}
              className="px-2.5 py-1 text-neutral-700 bg-white border border-neutral-200 rounded-md hover:border-blue-400 hover:text-blue-700 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
