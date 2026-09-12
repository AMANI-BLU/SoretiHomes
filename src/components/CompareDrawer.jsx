import React from 'react';
import { X, Trash2, Check, Zap, Gauge, BedDouble, Bath, Maximize2, Scale } from 'lucide-react';

export default function CompareDrawer({
  comparedItems,
  onRemoveCompare,
  onClearCompare,
  onClose,
  onSelect,
  t
}) {
  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content max-w-5xl my-auto animate-scale-up p-6">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
              {t?.compare || 'Compare'} ({comparedItems.length}/3)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {comparedItems.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Comparison Grid */}
        {comparedItems.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
            <Scale className="w-12 h-12 mx-auto stroke-1 text-slate-300 dark:text-slate-600" />
            <p className="font-bold text-slate-600 dark:text-slate-300">No assets selected for comparison</p>
            <p className="text-xs">Click "Compare" on any property or car card to compare them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 overflow-x-auto">
            {comparedItems.map((item) => {
              const isCar = item.category === 'car';
              return (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between relative shadow-sm"
                >
                  <button
                    onClick={() => onRemoveCompare(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-400 hover:text-rose-500 shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />

                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                        {item.server}
                      </span>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mt-1 line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 block mt-0.5">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Matrix Specs Comparison */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                      {isCar ? (
                        <>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Top Speed</span>
                            <span className="font-bold text-slate-900 dark:text-white">{item.specs.topSpeed}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Power</span>
                            <span className="font-bold text-slate-900 dark:text-white">{item.specs.horsepower}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Transmission</span>
                            <span className="font-bold text-slate-900 dark:text-white">Automatic</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Bedrooms</span>
                            <span className="font-bold text-slate-900 dark:text-white">{item.specs.beds} Beds</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Bathrooms</span>
                            <span className="font-bold text-slate-900 dark:text-white">{item.specs.baths} Baths</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Area</span>
                            <span className="font-bold text-slate-900 dark:text-white">{item.specs.sqft} m²</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelect(item);
                    }}
                    className="btn-primary py-2 w-full text-xs font-bold justify-center mt-4"
                  >
                    {t?.viewDetails || 'View Details'}
                  </button>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
