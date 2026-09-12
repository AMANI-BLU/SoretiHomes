import React, { useState } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  Sparkles,
  Building2,
  Car,
  DollarSign,
  ArrowUpDown,
  Check,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  Layers,
  Filter
} from 'lucide-react';
import { SERVERS, HOUSE_TYPES, CAR_TYPES } from '../data/mockListings';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  selectedServer,
  setSelectedServer,
  selectedType,
  setSelectedType,
  maxPrice,
  setMaxPrice,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onlyVerified,
  setOnlyVerified,
  totalResults,
  onResetFilters,
  t
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const availableTypes = activeTab === 'house'
    ? HOUSE_TYPES
    : activeTab === 'car'
    ? CAR_TYPES
    : [...new Set([...HOUSE_TYPES, ...CAR_TYPES])];

  const formatPrice = (val) => {
    if (val >= 100000000) return t?.anyPrice || 'Any Price';
    return `Under ETB ${(val / 1000000).toFixed(0)}M`;
  };

  const hasActiveFilters =
    activeTab !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedServer !== 'All Regions & Districts' ||
    selectedType !== 'All Types' ||
    statusFilter !== 'all' ||
    maxPrice < 100000000 ||
    onlyVerified;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/20 dark:border-amber-500/20 shadow-xl p-3 sm:p-6 mb-8 transition-all space-y-4 sm:space-y-5">
      
      {/* 1. Top Controls Bar: Category Pills + Search Input + Sort Dropdown */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
        
        {/* Category Segmented Switch Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto no-scrollbar shrink-0 w-full lg:w-auto">
          <button
            onClick={() => {
              setActiveTab('all');
              setSelectedType('All Types');
            }}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t?.allAssets || "All Assets"}
          </button>

          <button
            onClick={() => {
              setActiveTab('house');
              setSelectedType('All Types');
            }}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'house'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            {t?.properties || "Properties"}
          </button>

          <button
            onClick={() => {
              setActiveTab('car');
              setSelectedType('All Types');
            }}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'car'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            {t?.vehicles || "Vehicles"}
          </button>
        </div>

        {/* Live Search Field */}
        <div className="flex-1 min-w-0 w-full lg:min-w-[240px] relative">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t?.searchPlaceholder || "Search by title, district, specs or seller..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/50 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Advanced Toggle Group */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full lg:w-auto shrink-0">
          
          {/* Sort By Dropdown */}
          <div className="relative min-w-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2.5 sm:px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold focus-within:border-amber-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-w-0 max-w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 dark:bg-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="recommended" className="dark:bg-slate-800">{t?.featuredOrder || "Featured Order"}</option>
              <option value="price-asc" className="dark:bg-slate-800">{t?.priceLowHigh || "Price: Low to High"}</option>
              <option value="price-desc" className="dark:bg-slate-800">{t?.priceHighLow || "Price: High to Low"}</option>
              <option value="title-asc" className="dark:bg-slate-800">{t?.titleAZ || "Title: A - Z"}</option>
            </select>
          </div>

          {/* Toggle Advanced Filters Drawer Button */}
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`w-full justify-center px-2.5 sm:px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isAdvancedOpen || hasActiveFilters
                ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            <span>{t?.filters || "Filters"}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>

        </div>

      </div>

      {/* 2. Interactive Main Filter Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 pt-2">
        
        {/* District / Region Select */}
        <div className="lg:col-span-4 bg-slate-50/90 dark:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/90">
          <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">
            {t?.cityDistrict || "City District / Region"}
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 dark:bg-slate-800 focus:outline-none cursor-pointer"
            >
              {SERVERS.map(srv => (
                <option key={srv} value={srv} className="dark:bg-slate-800">{srv}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Asset Subtype Tags Dropdown / Selector */}
        <div className="lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/90">
          <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">
            {t?.assetType || "Asset Type"}
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 dark:bg-slate-800 focus:outline-none cursor-pointer"
          >
            {availableTypes.map(tItem => (
              <option key={tItem} value={tItem} className="dark:bg-slate-800">{tItem}</option>
            ))}
          </select>
        </div>

        {/* Status Filter Buttons (All / Sale / Rent) */}
        <div className="lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/90 p-3 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 flex flex-col justify-between">
          <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 px-1">
            {t?.listingStatus || "Listing Status"}
          </label>
          <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setStatusFilter('all')}
              className={`py-1 rounded-lg text-[11px] font-bold transition-all ${
                statusFilter === 'all' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t?.all || "All"}
            </button>
            <button
              onClick={() => setStatusFilter('For Sale')}
              className={`py-1 rounded-lg text-[11px] font-bold transition-all ${
                statusFilter === 'For Sale' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t?.sale || "Sale"}
            </button>
            <button
              onClick={() => setStatusFilter('For Rent')}
              className={`py-1 rounded-lg text-[11px] font-bold transition-all ${
                statusFilter === 'For Rent' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t?.rent || "Rent"}
            </button>
          </div>
        </div>

        {/* Max Budget Dropdown */}
        <div className="lg:col-span-2 bg-slate-50/90 dark:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/90">
          <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">
            {t?.maxBudget || "Max Budget"}
          </label>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 dark:bg-slate-800 focus:outline-none cursor-pointer"
            >
              <option value={100000000} className="dark:bg-slate-800">{t?.anyPrice || "Any Price"}</option>
              <option value={15000000} className="dark:bg-slate-800">Under ETB 15 Million</option>
              <option value={30000000} className="dark:bg-slate-800">Under ETB 30 Million</option>
              <option value={50000000} className="dark:bg-slate-800">Under ETB 50 Million</option>
            </select>
          </div>
        </div>

      </div>

      {/* 3. Advanced Collapsible Filter Drawer */}
      {isAdvancedOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4 animate-fade-in pt-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              Advanced Property & Vehicle Specifics
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Narrow down features</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Quick Price Presets */}
            <div>
              <span className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Quick Price Presets
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMaxPrice(15000000)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    maxPrice === 15000000 ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  Under 15M ETB
                </button>
                <button
                  onClick={() => setMaxPrice(30000000)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    maxPrice === 30000000 ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  Under 30M ETB
                </button>
                <button
                  onClick={() => setMaxPrice(50000000)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    maxPrice === 50000000 ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  Under 50M ETB
                </button>
                <button
                  onClick={() => setMaxPrice(100000000)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    maxPrice >= 100000000 ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  Any Budget
                </button>
              </div>
            </div>

            {/* Verified Sellers Toggle */}
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Verification & Trust
              </span>
              <label className="flex items-center gap-2.5 cursor-pointer bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                />
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Only Certified Brokers</span>
              </label>
            </div>

            {/* Sub-type quick tags */}
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Category Types
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableTypes.filter(t => t !== 'All Types').map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(selectedType === t ? 'All Types' : t)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedType === t
                        ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Active Filter Tags & Results Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        
        {/* Results Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {totalResults} {totalResults === 1 ? 'Asset' : 'Assets'} Found
          </span>
          {hasActiveFilters && (
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
              (Filtered from catalog)
            </span>
          )}
        </div>

        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {activeTab !== 'all' && (
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Category: {activeTab === 'house' ? 'Properties' : 'Vehicles'}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-amber-950 dark:hover:text-amber-100" onClick={() => setActiveTab('all')} />
            </span>
          )}

          {selectedServer !== 'All Regions & Districts' && (
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Region: {selectedServer}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-amber-950 dark:hover:text-amber-100" onClick={() => setSelectedServer('All Regions & Districts')} />
            </span>
          )}

          {selectedType !== 'All Types' && (
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Type: {selectedType}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-amber-950 dark:hover:text-amber-100" onClick={() => setSelectedType('All Types')} />
            </span>
          )}

          {statusFilter !== 'all' && (
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Status: {statusFilter}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-amber-950 dark:hover:text-amber-100" onClick={() => setStatusFilter('all')} />
            </span>
          )}

          {maxPrice < 100000000 && (
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Max: {formatPrice(maxPrice)}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-amber-950 dark:hover:text-amber-100" onClick={() => setMaxPrice(100000000)} />
            </span>
          )}

          {onlyVerified && (
            <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Verified Brokers Only
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-amber-950 dark:hover:text-amber-100" onClick={() => setOnlyVerified(false)} />
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-extrabold text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors ml-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
