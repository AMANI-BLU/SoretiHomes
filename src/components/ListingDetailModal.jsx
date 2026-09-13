import React, { useState } from 'react';
import { X, Heart, MapPin, CheckCircle2, ShieldCheck, Phone, Send, BedDouble, Bath, Maximize2, Zap, Gauge, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ListingDetailModal({
  item,
  isFavorite,
  onToggleFavorite,
  onClose,
  onAddBooking,
  t
}) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'inquiry'
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryErrors, setInquiryErrors] = useState({});

  const isCar = item.category === 'car';

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(val);
  };

  const validateInquiry = () => {
    const errs = {};
    if (!inquiryName.trim()) {
      errs.name = 'Please provide your full name.';
    } else if (inquiryName.trim().length < 3) {
      errs.name = 'Full name must be at least 3 characters.';
    }

    if (!inquiryPhone.trim()) {
      errs.phone = 'Phone number is required for follow-up.';
    } else if (!/^[0-9+() -]{9,16}$/.test(inquiryPhone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. 0911000000).';
    }

    setInquiryErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!validateInquiry()) return;

    setInquirySubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (onAddBooking) {
      onAddBooking({
        id: `BK-${Date.now().toString().slice(-4)}`,
        assetId: item.id,
        assetTitle: item.title,
        assetCategory: item.category,
        assetPrice: item.price,
        assetImage: item.images?.[0] || '',
        assetLocation: item.location,
        customerName: inquiryName,
        customerPhone: inquiryPhone,
        inspectionDate: new Date().toISOString().split('T')[0],
        inspectionTime: 'General Inquiry / Site Visit',
        notes: inquiryMessage || 'Direct inquiry submitted from listing detail page',
        status: 'Pending',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-scale-up my-auto max-w-4xl">
        
        {/* Modal Top Sticky Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <span className="badge-tag badge-gold font-bold">
              {item.server}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider">
              {item.type}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-2.5 rounded-full border border-slate-200 dark:border-slate-700 transition-all ${
                isFavorite ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200' : 'text-slate-500 hover:text-rose-500'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-8 space-y-8">
          
          {/* Main Showcase Gallery */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] border border-slate-200 dark:border-slate-800 shadow-lg group">
              <img
                src={item.images?.[selectedImgIndex] || item.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Verified Badge Overlay */}
              <div className="absolute top-4 left-4 bg-amber-500/90 text-slate-950 text-[11px] font-extrabold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                Soreti Verified Asset
              </div>
            </div>

            {/* Thumbnail Selection Bar */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{item.location}</span>
                <span>•</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{item.server}</span>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <div className="sm:text-right">
                <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 block tracking-tight">
                  {formatPrice(item.price)}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                  {t?.forRent || 'Rent'}: {formatPrice(item.rentPrice)}/mo
                </span>
              </div>
              <button
                onClick={() => setActiveTab('inquiry')}
                className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                Inquire / Contact Broker
              </button>
            </div>
          </div>

          {/* Navigation Tabs inside modal */}
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 font-bold text-sm transition-all border-b-2 ${
                activeTab === 'overview' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview & Specifications
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`pb-3 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'inquiry' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-4 h-4 text-amber-500" />
              Send Direct Inquiry
            </button>
          </div>

          {/* Tab 1: Overview & Specs */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {isCar ? (
                  <>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Model Year</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        {item.specs?.year || '2024'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Mileage</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        <Gauge className="w-4 h-4 text-amber-500" />
                        {item.specs?.mileage || '0 KM'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Engine</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5 truncate">
                        {item.specs?.engine || item.specs?.horsepower || 'V8 Engine'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Transmission</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        {item.specs?.transmission || 'Automatic'}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Bedrooms</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        <BedDouble className="w-4 h-4 text-amber-500" />
                        {item.specs?.beds ?? 3} Beds
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Bathrooms</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        <Bath className="w-4 h-4 text-amber-500" />
                        {item.specs?.baths ?? 2} Baths
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Area</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        <Maximize2 className="w-4 h-4 text-amber-500" />
                        {item.specs?.sqft || item.specs?.area || 250} m²
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block">Parking</span>
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                        {item.specs?.garageSlots ?? 2} Spaces
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-extrabold text-slate-400 dark:text-slate-500 text-xs mb-2 uppercase tracking-wider">
                  Description
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  {item.description}
                </p>
              </div>

              {/* Seller Contact Info Card */}
              <div className="p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                    <img src="/soreti-logo.jpg" alt="Soreti Homes Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                      Soreti Homes (የቤት ሸያጭ ብቻ)
                      <CheckCircle2 className="w-4 h-4 text-amber-500 fill-amber-100" />
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Broker • Addis Ababa</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Call Us Directly</span>
                    <span className="text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      0998 635 499 / 0948 002 510
                    </span>
                  </div>

                  <a
                    href="https://t.me/soretihomes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-2 px-3.5 text-xs font-bold shrink-0 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Telegram
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Direct Inquiry Form */}
          {activeTab === 'inquiry' && (
            <div className="animate-fade-in space-y-4">
              {inquirySubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200">
                    Inquiry Transmitted Successfully!
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold">{inquiryName || 'Valued Client'}</span>. Soreti Homes team will contact you directly at <span className="font-bold">{inquiryPhone}</span> regarding <span className="font-bold">{item.title}</span>.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href="https://t.me/soretihomes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-2.5 px-6 text-xs font-bold inline-flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Chat on Telegram
                    </a>
                    <button
                      onClick={() => {
                        setInquirySubmitted(false);
                        setActiveTab('overview');
                      }}
                      className="btn-secondary py-2.5 px-6 text-xs font-bold"
                    >
                      Back to Overview
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} noValidate className="space-y-4 bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <Send className="w-5 h-5 text-amber-500" />
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Send Direct Inquiry to Soreti Homes
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Abebe Kebede"
                        value={inquiryName}
                        onChange={(e) => {
                          setInquiryName(e.target.value);
                          if (inquiryErrors.name) setInquiryErrors(prev => ({ ...prev, name: null }));
                        }}
                        className={`w-full p-3 text-sm font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                          inquiryErrors.name
                            ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                        }`}
                      />
                      {inquiryErrors.name && (
                        <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{inquiryErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="0911000000"
                        value={inquiryPhone}
                        onChange={(e) => {
                          setInquiryPhone(e.target.value);
                          if (inquiryErrors.phone) setInquiryErrors(prev => ({ ...prev, phone: null }));
                        }}
                        className={`w-full p-3 text-sm font-semibold rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                          inquiryErrors.phone
                            ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'
                        }`}
                      />
                      {inquiryErrors.phone && (
                        <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{inquiryErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      Message / Custom Offer
                    </label>
                    <textarea
                      rows={3}
                      placeholder="I am interested in this listing. Please contact me with more details or schedule a visit."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full p-3 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-sm font-extrabold justify-center shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4" />
                    Submit Inquiry Now
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
