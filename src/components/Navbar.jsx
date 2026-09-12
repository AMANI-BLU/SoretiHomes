import React, { useState } from 'react';
import { Car, Building2, Heart, Sparkles, Send, Menu, X, Sun, Moon, HelpCircle } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenFavorites,
  onNavigateHome,
  theme,
  toggleTheme,
  onOpenIntentModal,
  lang,
  onLanguageChange,
  t
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20 dark:border-amber-500/20 shadow-md transition-colors duration-300">
      <div className="app-container flex items-center justify-between gap-2 min-w-0 h-16 sm:h-20">
        
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer group"
          onClick={() => {
            if (onNavigateHome) onNavigateHome();
            setActiveTab('all');
            setMobileMenuOpen(false);
          }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <img src="/soreti-logo.jpg" alt="Soreti Homes Logo" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white truncate">{t?.siteTitle || "SORETI HOMES"}</span>
            </div>
            <p className="hidden sm:block text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase truncate">
              {t?.amharicTagline || "የቤት ሸያጭ ብቻ"} • Addis Ababa
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
          <button
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/70 dark:hover:bg-slate-700/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t?.allAssets || "All Assets"}
          </button>

          <button
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              setActiveTab('house');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'house'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/70 dark:hover:bg-slate-700/70'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            {t?.properties || "Properties"}
          </button>

          <button
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              setActiveTab('car');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'car'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/70 dark:hover:bg-slate-700/70'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            {t?.vehicles || "Vehicles"}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Language Selector Switcher (EN / AM) */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                lang === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('am')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                lang === 'am'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              አማ
            </button>
          </div>

          {/* Quick Choice / Intent Modal Button */}
          {onOpenIntentModal && (
            <button
              onClick={onOpenIntentModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/80 transition-all shadow-xs"
              title={t?.chooseCategory}
            >
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t?.chooseCategory || "Choose Category"}</span>
            </button>
          )}

          {/* Phone Numbers Banner (Desktop) */}
          <div className="hidden xl:flex flex-col text-right text-xs font-bold text-slate-700 dark:text-slate-200 pr-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{t?.callUsDirectly || "Call Us Directly"}</span>
            <span className="text-amber-600 dark:text-amber-400 font-extrabold text-xs">0998 635 499</span>
          </div>

          {/* Theme Switcher Toggle (Sun / Moon) */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Favorites Wishlist */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:text-amber-500 dark:hover:text-amber-400 transition-all"
            title={t?.savedFavorites || "Saved Favorites"}
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Contact Us Telegram CTA */}
          <a
            href="https://t.me/gamme29"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2.5 px-4 text-xs font-bold hidden sm:inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {t?.contactUs || "Contact Us"}
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 space-y-3 animate-fade-in shadow-xl">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{t?.language || "Language"}:</span>
              <button
                onClick={() => onLanguageChange(lang === 'en' ? 'am' : 'en')}
                className="text-xs font-extrabold text-amber-500 bg-amber-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-slate-700"
              >
                {lang === 'en' ? 'English (EN)' : 'አማርኛ (AM)'}
              </button>
            </div>

            {onOpenIntentModal && (
              <button
                onClick={() => {
                  onOpenIntentModal();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {t?.chooseCategory || "Choose Category"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                setActiveTab('all');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t?.allAssets || "All Assets"}
            </button>
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                setActiveTab('house');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                activeTab === 'house' ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {t?.properties || "Properties"}
            </button>
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                setActiveTab('car');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                activeTab === 'car' ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Car className="w-4 h-4" />
              {t?.vehicles || "Vehicles"}
            </button>
          </div>

          <div className="pt-2">
            <a
              href="https://t.me/gamme29"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-2.5 text-xs justify-center font-bold items-center gap-2 flex"
            >
              <Send className="w-4 h-4" />
              {t?.contactUs || "Contact Us"} (Telegram)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
