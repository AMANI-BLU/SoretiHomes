import React from 'react';
import { Users, Building2, MapPin, Award } from 'lucide-react';

export default function StatsBanner() {
  const STATS = [
    {
      id: 1,
      icon: Users,
      value: "1,200+",
      label: "Happy Homeowners & Buyers"
    },
    {
      id: 2,
      icon: Building2,
      value: "2,500+",
      label: "Properties & Vehicles Listed"
    },
    {
      id: 3,
      icon: MapPin,
      value: "15+",
      label: "Prime Addis Ababa Districts"
    },
    {
      id: 4,
      icon: Award,
      value: "98%",
      label: "Client Satisfaction Rate"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white py-14 sm:py-16 shadow-inner border-y border-amber-500/20">
      <div className="app-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 sm:gap-8 lg:gap-12">
          {STATS.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div key={stat.id} className="flex items-center gap-4.5 group">
                <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-center text-white dark:text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-white group-hover:text-amber-600 transition-all duration-300 shadow-md">
                  <IconComp className="w-6.5 h-6.5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight block text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-amber-100 dark:text-amber-300 font-semibold uppercase tracking-wider block mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
