import React from 'react';
import { Check, Languages } from 'lucide-react';
import { LANGUAGE_OPTIONS } from '../data/translations';

export default function InitialLanguageModal({ isOpen, lang, onLanguageChange, t }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop z-[110] animate-fade-in p-4 sm:p-6">
      <div
        className="modal-content max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-2xl border border-amber-500/30 dark:border-amber-500/20 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="initial-language-title"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Languages className="w-7 h-7" />
          </div>
          <h2 id="initial-language-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t?.selectLanguage || 'Choose your language'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            {t?.languagePrompt || 'Select a language to continue'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
            {LANGUAGE_OPTIONS.map((option) => {
              const isSelected = lang === option.code;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => onLanguageChange(option.code)}
                  className={`relative min-h-24 rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:bg-amber-50/60 dark:hover:bg-slate-800'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="block text-sm font-extrabold">{option.label}</span>
                  <span className="block mt-1 text-[11px] font-bold uppercase tracking-wider opacity-60">{option.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
