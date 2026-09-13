import React from 'react';
import { Home, Car, Shield, Phone, Mail, Globe, ArrowUp, Send, MapPin } from 'lucide-react';

export default function Footer({ onNavigateAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-support" className="bg-slate-900 text-slate-400 pt-20 pb-10 border-t border-slate-800">
      <div className="app-container">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-slate-800/90">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                <img src="/soreti-logo.jpg" alt="Soreti Homes Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block">
                  SORETI HOMES
                </span>
                <span className="text-xs font-extrabold text-amber-400 block">
                  የቤት ሸያጭ ብቻ • Addis Ababa
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              ታማኝ | ፈጣን | ሙያዊ — Premier real estate and luxury motor vehicles marketplace in Addis Ababa, Ethiopia.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700/80">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700/80">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Broker</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-5">
              Properties & Motors
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">Bole & Atlas Villas</a></li>
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">Kazanchis Penthouses</a></li>
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">Old Airport Estates</a></li>
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">CMC Luxury Apartments</a></li>
            </ul>
          </div>

          {/* Col 3: Prime Regions */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-5">
              Addis Ababa Districts
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">Bole & Medhanialem</a></li>
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">Kazanchis & Kirkos</a></li>
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">Old Airport & Sarbet</a></li>
              <li><a href="#featured-listings" className="hover:text-amber-400 transition-colors">CMC & Summit Township</a></li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-5">
              Direct Phone & Contact
            </h4>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:0998635499" className="hover:text-white transition-colors">0998 635 499</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:0948002510" className="hover:text-white transition-colors">0948 002 510</a>
              </li>
              <li className="pt-2">
                <a
                  href="https://t.me/soretihomes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2 px-3.5 text-xs font-bold inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram (@soretihomes)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <p>© 2026 Soreti Homes (የቤት ሸያጭ ብቻ). All rights reserved. Addis Ababa, Ethiopia.</p>
            {onNavigateAdmin && (
              <>
                <span className="text-slate-700 hidden sm:inline">•</span>
                <button
                  onClick={onNavigateAdmin}
                  className="text-amber-500/80 hover:text-amber-400 font-semibold transition-colors inline-flex items-center gap-1"
                >
                  <span>Admin Portal</span>
                </button>
              </>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-300 hover:text-white font-bold transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

