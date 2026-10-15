import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 mt-16 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2.5">What's new</h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li><a href="#windows11" className="hover:text-neutral-900 transition-colors">Windows 11 apps</a></li>
              <li><a href="#surface" className="hover:text-neutral-900 transition-colors">Surface Pro 11th Edition</a></li>
              <li><a href="#copilot" className="hover:text-neutral-900 transition-colors">Copilot in Windows</a></li>
              <li><a href="#m365" className="hover:text-neutral-900 transition-colors">Microsoft 365</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2.5">Microsoft Store</h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li><a href="#account" className="hover:text-neutral-900 transition-colors">Account profile</a></li>
              <li><a href="#download" className="hover:text-neutral-900 transition-colors">Download Center</a></li>
              <li><a href="#returns" className="hover:text-neutral-900 transition-colors">Returns & refunds</a></li>
              <li><a href="#tracking" className="hover:text-neutral-900 transition-colors">Order tracking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2.5">Support & Help</h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li><a href="#contact" className="hover:text-neutral-900 transition-colors">Contact Microsoft Support</a></li>
              <li><a href="#community" className="hover:text-neutral-900 transition-colors">Microsoft Community</a></li>
              <li><a href="#answers" className="hover:text-neutral-900 transition-colors">Windows Error Directory</a></li>
              <li><a href="#recovery" className="hover:text-neutral-900 transition-colors">BitLocker Key Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2.5">Enterprise & Education</h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li><a href="#azure" className="hover:text-neutral-900 transition-colors">Microsoft Azure</a></li>
              <li><a href="#volume" className="hover:text-neutral-900 transition-colors">Volume Licensing</a></li>
              <li><a href="#tech" className="hover:text-neutral-900 transition-colors">TechNet Documentation</a></li>
              <li><a href="#status" className="hover:text-neutral-900 transition-colors">Service Health</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          
          <div className="flex items-center gap-2 text-neutral-700">
            <Globe className="w-3.5 h-3.5" />
            <span>English (United States)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-neutral-500">
            <a href="#privacy" className="hover:text-neutral-800 transition-colors">Privacy & Cookies</a>
            <a href="#legal" className="hover:text-neutral-800 transition-colors">Terms of Use</a>
            <a href="#trademarks" className="hover:text-neutral-800 transition-colors">Trademarks</a>
            <a href="#safety" className="hover:text-neutral-800 transition-colors">Safety & Eco</a>
            <a href="#about" className="hover:text-neutral-800 transition-colors">About our ads</a>
            <span>© Microsoft 2026</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
