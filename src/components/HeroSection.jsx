import React from 'react';
import { Search, MapPin, Home, Car, Building2, SlidersHorizontal, ArrowRight, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { SERVERS, HOUSE_TYPES, CAR_TYPES } from '../data/mockListings';

export default function HeroSection({ onExploreCategory, onOpenIntentModal, t }) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-amber-50/60 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
      
      {/* Background Ambient Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="app-container relative z-10">
        
        {/* Hero Top Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Hero Typography */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t?.siteTitle || "SORETI HOMES"} • {t?.amharicTagline || "የቤት ሸያጭ ብቻ"} • Addis Ababa</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              {t?.whatAreYouLookingFor || "What are you looking to discover today?"}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
              {t?.motto || "ታማኝ | ፈጣን | ሙያዊ"} — {t?.heroSubtitle || "Your trusted real estate & premium vehicle partner in Addis Ababa."} <span className="font-extrabold text-slate-900 dark:text-white">0998 635 499</span> / <span className="font-extrabold text-slate-900 dark:text-white">0948 002 510</span>.
            </p>

            {/* Interactive Intent Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onExploreCategory('car')}
                className="group p-4 rounded-2xl border border-amber-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg transition-all text-left flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {t?.vehicles || "Vehicles & Motors"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">V8 SUVs, Supercars, Exotic Motors</p>
                </div>
              </button>

              <button
                onClick={() => onExploreCategory('house')}
                className="group p-4 rounded-2xl border border-amber-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg transition-all text-left flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {t?.properties || "Mansions & Properties"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Bole Villas, Penthouses, Estates</p>
                </div>
              </button>
            </div>

            {/* View All Option */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onExploreCategory('all')}
                className="btn-primary py-3.5 px-7 text-xs font-bold"
              >
                <Sparkles className="w-4 h-4" />
                {t?.browseAllListings || "Browse All Marketplace Listings"}
              </button>
            </div>

          </div>

          {/* Right Hero Image Card Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/80 dark:border-amber-500/40 aspect-[16/10] group animate-float">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Soreti Homes Luxury Real Estate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
              
              {/* Overlay Badge Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-400/50 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                    <img src="/soreti-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Bole Atlas Luxury Villa & V8 Pack</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">Bole District • 0998 635 499</p>
                  </div>
                </div>
                <span className="font-extrabold text-amber-500 dark:text-amber-400 text-lg sm:text-xl shrink-0">ETB 45M</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

