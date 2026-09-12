import React from 'react';
import { Car, Building2, Sparkles, X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function InitialIntentModal({ isOpen, onClose, onSelectIntent, t }) {
  if (!isOpen) return null;

  const handleSelect = (category) => {
    onSelectIntent(category);
    onClose();
  };

  return (
    <div className="modal-backdrop z-[100] animate-fade-in p-4 sm:p-6">
      <div className="modal-content max-w-3xl w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-500/30 dark:border-amber-500/20 relative overflow-hidden">
        
        {/* Background Decorative Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs font-extrabold tracking-wide">
            <img src="/soreti-logo.jpg" alt="Logo" className="w-5 h-5 rounded-full object-cover" />
            <span>Soreti Homes • የቤት ሸያጭ ብቻ</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {t?.whatAreYouLookingFor || "What are you looking for today?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t?.motto || "ታማኝ | ፈጣን | ሙያዊ"} — Select your primary choice or call us at <strong className="text-amber-600 dark:text-amber-400">0998 635 499</strong> / <strong className="text-amber-600 dark:text-amber-400">0948 002 510</strong>.
          </p>
        </div>

        {/* 2 Primary Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
          
          {/* HOUSES OPTION CARD */}
          <div
            onClick={() => handleSelect('house')}
            className="group relative rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform font-extrabold">
                <Building2 className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  Addis Ababa Real Estate
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {t?.properties || "Luxury Estates & Houses"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Bole Villas, Old Airport estates, CMC luxury apartments, and G+2 mansions.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Verified Legal Deeds & Ownership</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Prime Bole & Kazanchis Locations</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/40 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform relative z-10">
              <span>{t?.exploreProperties || "Show Properties Catalog"}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* CARS OPTION CARD */}
          <div
            onClick={() => handleSelect('car')}
            className="group relative rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform font-extrabold">
                <Car className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  High Performance Motors
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {t?.vehicles || "Luxury Vehicles & Cars"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  V8 Land Cruisers, Range Rovers, Porsche 911s, and executive vehicles.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Inspected Engine & Full Service</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Instant Title Transfer</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/40 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform relative z-10">
              <span>{t?.browseVehicles || "Show Vehicles Catalog"}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Bottom All Listings CTA */}
        <div className="pt-2 text-center">
          <button
            onClick={() => handleSelect('all')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:underline transition-all py-2 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {t?.browseAllListings || "Or browse all vehicles & houses combined"}
          </button>
        </div>

      </div>
    </div>
  );
}
