import React from 'react';
import { Home, Compass, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage({ onNavigateHome, onExploreCategory }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        
        {/* Visual 404 Badge */}
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-amber-500 tracking-tight block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Page or Asset Not Found
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The page, property, or vehicle listing you are trying to view does not exist, has been sold, or has moved to a different location.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={onNavigateHome}
            className="btn-primary w-full py-3 text-xs sm:text-sm font-extrabold justify-center"
          >
            <Home className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => onExploreCategory('house')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-500 transition-colors"
            >
              Browse Houses
            </button>
            <button
              onClick={() => onExploreCategory('car')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-500 transition-colors"
            >
              Browse Vehicles
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
