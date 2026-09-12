import React from 'react';
import { ArrowRight, Building, Home, Car, Shield } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/mockListings';

const iconMap = {
  Building: Building,
  Home: Home,
  Car: Car,
  Shield: Shield
};

export default function CategorySection({ onSelectCategory, t }) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="app-container">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t?.chooseCategory || "CHOOSE BY ASSET TYPE"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t?.featuredHeadline || "Find an Asset That Fits"} <span className="text-amber-500 dark:text-amber-400">{t?.justForYou || "Your Lifestyle"}</span>
            </h2>
          </div>
          
          <button
            onClick={() => onSelectCategory('all')}
            className="btn-secondary text-xs font-bold self-start sm:self-auto shrink-0"
          >
            {t?.browseAllListings || "View All Categories"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CATEGORIES_CONFIG.map((cat) => {
            const IconComp = iconMap[cat.icon] || Home;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.type, cat.filterType)}
                className="group relative bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Category Thumbnail */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Circular Icon Badge */}
                  <div className="absolute bottom-4 left-5 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center text-amber-500 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 dark:group-hover:bg-amber-500 dark:group-hover:text-slate-950 transition-colors duration-300">
                    <IconComp className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1.5">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/70 dark:border-slate-700/70">
                    <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {cat.count}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t?.viewDetails || "Explore Now"} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

