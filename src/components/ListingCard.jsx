import React from 'react';
import { Heart, MapPin, BedDouble, Bath, Maximize2, Zap, Gauge, Shield, ArrowUpRight } from 'lucide-react';

export default function ListingCard({
  item,
  isFavorite,
  onToggleFavorite,
  onSelect,
  t
}) {
  const isCar = item.category === 'car';

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="asset-card group">
      
      {/* Image Header Container */}
      <div className="relative h-60 overflow-hidden bg-slate-900">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          
          {/* Status Tag */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className={`badge-tag ${item.status === 'For Sale' ? 'badge-orange' : 'badge-green'}`}>
              {item.status === 'For Sale' ? (t?.forSale || 'For Sale') : (t?.forRent || 'For Rent')}
            </span>
            {item.badge && (
              <span className="badge-tag badge-gold font-bold">
                {item.badge}
              </span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto shadow-lg hover:scale-110 ${
              isFavorite ? 'text-rose-500 bg-white' : 'text-slate-500 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

        </div>

        {/* Category Icon Pill */}
        <div className="absolute bottom-3.5 left-3.5 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-md">
          <span className="text-amber-400 font-extrabold">{isCar ? (t?.cars || 'Vehicle') : (t?.properties || 'Property')}</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-300 font-bold">{item.server}</span>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Price Header */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 mb-2">
            <span className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {formatPrice(item.price)}
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {formatPrice(item.rentPrice)}/mo
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(item)}
            className="font-extrabold text-slate-900 dark:text-white text-base leading-snug cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1"
          >
            {item.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          {/* Specifications Icons Row */}
          <div className="grid grid-cols-3 gap-2.5 my-5 p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 text-xs">
            {isCar ? (
              <>
                <div className="flex flex-col items-center text-center">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.specs.topSpeed}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Speed</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-slate-200/80 dark:border-slate-700/80">
                  <Gauge className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.specs.horsepower}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Power</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">Auto</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Trans</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center">
                  <BedDouble className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.specs.beds} Beds</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Beds</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-slate-200/80 dark:border-slate-700/80">
                  <Bath className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.specs.baths} Baths</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Baths</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Maximize2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.specs.sqft} m²</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Area</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          {/* View Details Button */}
          <button
            onClick={() => onSelect(item)}
            className="btn-primary w-full sm:w-auto justify-center py-2.5 px-4.5 text-xs font-bold"
          >
            {t?.viewDetails || 'View Details'}
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
