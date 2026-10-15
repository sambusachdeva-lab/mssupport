import React from 'react';
import { 
  Laptop, 
  Layers, 
  Tablet, 
  Gamepad2, 
  ShieldCheck, 
  Headphones, 
  ChevronRight, 
  Wrench, 
  Volume2, 
  RefreshCw, 
  KeyRound, 
  Cpu
} from 'lucide-react';
import { SUPPORT_PRODUCTS, SUPPORT_ISSUES } from '../data/supportData';
import { Product, SupportIssue } from '../types/support';

interface ProductCategoryGridProps {
  onSelectProduct: (product: Product) => void;
  onSelectIssue: (issue: SupportIssue) => void;
  onLaunchDiagnostics: (type: string) => void;
  heroImage: string;
}

export const ProductCategoryGrid: React.FC<ProductCategoryGridProps> = ({
  onSelectProduct,
  onSelectIssue,
  onLaunchDiagnostics,
  heroImage
}) => {
  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'windows':
        return <Laptop className="w-6 h-6 text-blue-600" />;
      case 'm365':
        return <Layers className="w-6 h-6 text-red-600" />;
      case 'surface':
        return <Tablet className="w-6 h-6 text-sky-600" />;
      case 'xbox':
        return <Gamepad2 className="w-6 h-6 text-emerald-600" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      case 'headphones':
        return <Headphones className="w-6 h-6 text-indigo-600" />;
      default:
        return <Laptop className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Featured Windows Support Banner */}
      <div className="mb-10 bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
                <span>Featured Product Support</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
                Windows 11 & Windows 10 Support
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Get guided assistance for system activation, cumulative update errors, audio drivers, blue screen stop codes, and device recovery.
              </p>

              {/* Fast Troubleshooter Action Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <button
                  onClick={() => onLaunchDiagnostics('update')}
                  className="flex flex-col items-center justify-center p-3 text-center rounded-lg border border-neutral-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-neutral-800"
                >
                  <RefreshCw className="w-4 h-4 text-blue-600 mb-1.5" />
                  <span className="text-xs font-medium">Update Fixer</span>
                </button>

                <button
                  onClick={() => onLaunchDiagnostics('activation')}
                  className="flex flex-col items-center justify-center p-3 text-center rounded-lg border border-neutral-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-neutral-800"
                >
                  <KeyRound className="w-4 h-4 text-blue-600 mb-1.5" />
                  <span className="text-xs font-medium">Activation</span>
                </button>

                <button
                  onClick={() => onLaunchDiagnostics('audio')}
                  className="flex flex-col items-center justify-center p-3 text-center rounded-lg border border-neutral-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-neutral-800"
                >
                  <Volume2 className="w-4 h-4 text-blue-600 mb-1.5" />
                  <span className="text-xs font-medium">Sound Audio</span>
                </button>

                <button
                  onClick={() => onLaunchDiagnostics('bsod')}
                  className="flex flex-col items-center justify-center p-3 text-center rounded-lg border border-neutral-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-neutral-800"
                >
                  <Cpu className="w-4 h-4 text-blue-600 mb-1.5" />
                  <span className="text-xs font-medium">BSOD Crash</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => {
                  const winProduct = SUPPORT_PRODUCTS.find(p => p.id === 'windows');
                  if (winProduct) onSelectProduct(winProduct);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Explore Windows Issues
              </button>
              <button
                onClick={() => onLaunchDiagnostics('full')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Launch Get Help Diagnostics</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] bg-neutral-100 border-t lg:border-t-0 lg:border-l border-neutral-200">
            <img
              src={heroImage}
              alt="Windows 11 Laptop support settings"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Select the product you need help with
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Choose a category to see verified troubleshooting steps, diagnostic utilities, or connect with our specialized support desk.
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SUPPORT_PRODUCTS.map(product => (
          <div
            key={product.id}
            className="group relative bg-white border border-neutral-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-neutral-50 group-hover:bg-blue-50/80 transition-colors">
                  {getProductIcon(product.icon)}
                </div>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="text-xs font-medium text-neutral-500 group-hover:text-blue-600 flex items-center gap-1"
                >
                  <span>View all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Popular links */}
              <div className="space-y-1.5 pt-3 border-t border-neutral-100">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                  Common requests
                </span>
                {product.popularIssues.slice(0, 3).map((issueTitle, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const matchedIssue = SUPPORT_ISSUES.find(i =>
                        issueTitle.toLowerCase().includes(i.category) ||
                        i.title.toLowerCase().includes(issueTitle.toLowerCase())
                      );
                      if (matchedIssue) {
                        onSelectIssue(matchedIssue);
                      } else {
                        onSelectProduct(product);
                      }
                    }}
                    className="w-full text-left text-xs text-neutral-700 hover:text-blue-600 hover:underline flex items-center justify-between py-1"
                  >
                    <span className="truncate pr-2">{issueTitle}</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100">
              <button
                onClick={() => onSelectProduct(product)}
                className="w-full py-2 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-blue-600 hover:text-white rounded-md transition-colors text-center"
              >
                Contact {product.name} Support
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Surface Hardware & Diagnostics Spotlight */}
      <div className="mt-10 p-5 bg-[#f8fafc] rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">
            Have a Surface device or hardware issue?
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5">
            Check your device warranty status using your 12-digit serial number or initiate an official Microsoft hardware replacement request.
          </p>
        </div>
        <button
          onClick={() => {
            const surfIssue = SUPPORT_ISSUES.find(i => i.id === 'surface-power');
            if (surfIssue) onSelectIssue(surfIssue);
          }}
          className="px-4 py-2 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-400 rounded-md shadow-2xs whitespace-nowrap"
        >
          Surface Diagnostic & Warranty
        </button>
      </div>

    </div>
  );
};
